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
            setHeight(window.innerHeight * 0.8); // Define a altura 0.8 da altura da janela
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Define a altura ao montar o componente

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <LayoutMasterPage 
        titulo='Dashboard'  height={height}
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
            <Box gap={1}
                margin={1}
                padding={1}
                paddingX={2}
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="start"
                component={Paper} 
                flexGrow={1}
                >
                    <BarCharts valorAno={valorAno} />
            </Box>
        </LayoutMasterPage>
    );
}
