import { LayoutMasterPage } from '../shared/layouts';
import { Box, Paper } from '@mui/material';

import { BarCharts, BarraFerramentas } from '../shared/components';

export const Dashboard = () => {
    const [height, setHeight] = useState(0);    
    
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
            <BarraFerramentas isOpenDataMesAno={true} btnSalvar={false} btnNovo={false} btnVoltar={false}  />
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
                    <BarCharts  />
            </Box>
        </LayoutMasterPage>
    );
}
function useEffect(arg0: () => () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}

function useState(arg0: number): [any, any] {
    throw new Error('Function not implemented.');
}

