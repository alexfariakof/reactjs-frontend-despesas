import { LayoutMasterPage } from '../shared/layouts';
import { Box, Paper } from '@mui/material';

import { BarCharts, BarraFerramentas } from '../shared/components';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export const Dashboard = () => {
    const [valorAno, setValorAno] = useState<Dayjs | null>(dayjs());

    const handleAtualizarGraficoDados = (valorAno:Dayjs) => {
        setValorAno(valorAno);
     };


    return (
        <LayoutMasterPage 
        titulo='Dashboard' 
        barraDeFerramentas={(
            <BarraFerramentas  
            isOpenDataAno={true}
            btnNovo={false}
            btnSalvar={false}
            btnVoltar={false}
            btnAtualizarGrafico={true}
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
                    <BarCharts handleAtualizarGrafico={handleAtualizarGraficoDados} valorAno={valorAno} />
            </Box>
        </LayoutMasterPage>
    );
}
