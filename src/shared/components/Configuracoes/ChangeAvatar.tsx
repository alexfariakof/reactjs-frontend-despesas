/* eslint-disable react/style-prop-object */
import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, InputLabel, Paper, Typography, useTheme } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { ImagemPerfilUsuarioService, ImagemPerfilUsuarioVM } from "../../services/api";
import { useDebounce } from "../../hooks/UseDebounce";

const ChangeAvatar: React.FC = () => {
    const theme = useTheme();
    const [file, setFile] = useState<File | any>(null);
    const [fileLoaded, setFileLoaded] = useState<boolean>(false);
    const [imagemPerfilUsuario, setImagemPerfilUsuario] = useState<ImagemPerfilUsuarioVM | null>(null);
    const { debounce } = useDebounce();
    
    const handleAvatarUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setFileLoaded(true);
        }
    };

    useEffect(() => {
        debounce(async () => {
            setImagemPerfilUsuario(await ImagemPerfilUsuarioService.getImagemPerfilUsuarioByIdUsuario());
        });
    });
    

    const handleImagePerfil = () => {
        if (file !== null) {
            if (imagemPerfilUsuario == null) {
                ImagemPerfilUsuarioService.createImagemPerfilUsuario(file)
                    .then((result) => {
                        if (result === true) {
                            alert("Imagem de perfil usuário incluída com sucesso");
                        }
                    });
            }
            else{
                ImagemPerfilUsuarioService.updateImagemPerfilUsuario(file)
                .then((result) => {
                    if (result === true) {
                        alert("Imagem de perfil usuário alterada com sucesso");
                    }
                });
            }
        } else {
            alert('Nenhuma imagem foi carregada!');
        }
    };
    
    return (
        <Box
            gap={1}
            margin={1}
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
                        src={imagemPerfilUsuario !== null ? imagemPerfilUsuario.url : "/assets/imagem_Perfil.png"} />
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
