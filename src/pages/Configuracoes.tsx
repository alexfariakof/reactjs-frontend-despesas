import { useState, MouseEvent } from 'react';
import { useAppThemeContext } from "../shared/contexts";
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { LayoutMasterPage } from '../shared/layouts';
import ChangeAvatar from '../shared/components/Configuracoes/ChangeAvatar';
import ChangePassword from '../shared/components/Configuracoes/ChangePassword';



export const Configuracoes = () => {
    
    const { toggleTheme } = useAppThemeContext();
    const [alignment, setAlignment] = useState('web');

    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string,) => {
        setAlignment(newAlignment);
        toggleTheme();
    }


    return (
        <LayoutMasterPage
            titulo='Configurações'            
        >
            <Box height="100%" width='100%' display="flex" margin={0} flexDirection="column" bgcolor='#00F12F' >
                <Box
                    gap={1}
                    margin={1}
                    padding={1}
                    paddingX={2}
                    height="auto"
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    component={Paper} >
                    <Typography variant='h6'>
                        Tema
                    </Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="light">Claro</ToggleButton>
                        <ToggleButton value="dark">Escuro</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <ChangePassword />
                <ChangeAvatar />
            </Box>
        </LayoutMasterPage>
    );
}