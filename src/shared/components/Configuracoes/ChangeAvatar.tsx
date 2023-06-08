/* eslint-disable react/style-prop-object */
import { ChangeEvent, useState } from "react";
import { Avatar, Box, Button, InputLabel, Paper, Typography, useTheme } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

const ChangeAvatar: React.FC = () => {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [fileLoaded, setFileLoaded] = useState<boolean>(false);

    const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setFileLoaded(true);
        }
    };

    const handleImagePerfil = () => {
        // Lógica para salvar a imagem do perfil
    };

    return (
        <Box
            gap={1}            
            padding={1}
            paddingX={2}
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="start"
            component={Paper}
        >
            <Typography variant='h6'>
                Trocar Imagem de Perfil
            </Typography>
            <Box flexDirection="row">
                <InputLabel htmlFor="upload-photo">
                    <Avatar
                        alt="Alex Ribeiro"
                        sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                        src="/assets/imagem_Perfil.png"
                    />
                </InputLabel>
                {fileLoaded && <span style={{ color: 'green', marginBottom:'1em' }}>Arquivo carregado com sucesso!</span>}
                <input
                    style={{ display: 'none' }}
                    id='upload-photo'
                    name='upload-photo'
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleAvatarUpload}
                />
                
                <br />
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<SaveIcon />}
                    onClick={handleImagePerfil}
                >
                    Salvar
                </Button>
            </Box>
        </Box>
    );
}

export default ChangeAvatar;
