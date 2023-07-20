import { LayoutMasterPage } from '../shared/layouts';
import { Box, Paper } from '@mui/material';
import { BarCharts, BarraFerramentas } from '../shared/components';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export const Dashboard = () => {
    const [valorAno, setValorAno] = useState<Dayjs>(dayjs());
    const [height, setHeight] = useState(0);    
   
    const handleAtualizarGraficoDados = (valorAno:Dayjs) => {
        setValorAno(valorAno);
     };

     useEffect(() => {
        const handleResize = () => {
            setHeight(document.body.clientHeight); // Define a altura 0.8 da altura da janela
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Define a altura ao montar o componente

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <LayoutMasterPage 
        titulo='Dashboard'  
        barraDeFerramentas={(
            <BarraFerramentas  
            btnAtualizarGrafico={true}
            isOpenDataAno={true}
            btnNovo={false}
            btnSalvar={false}
            btnVoltar={false}      
            valorAno={valorAno}      
            handleAtualizarGrafico={handleAtualizarGraficoDados}
            />
          )}
        > 
            <Box
                margin={1}
                paddingX={2}
                height={height}
                display="flex"
                flexDirection="column"
                alignItems="stretch"
                alignContent='space-around'
                component={Paper} 
                overflow="hidden"
                >
                    <BarCharts height={height} valorAno={valorAno} />
            </Box>
        </LayoutMasterPage>
    );
}