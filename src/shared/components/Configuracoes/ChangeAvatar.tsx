import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, InputLabel, Paper, Typography, useTheme } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { ImagemPerfilUsuarioService, ImagemPerfilUsuarioVM } from "../../services/api";
import { useDebounce } from "../../hooks/UseDebounce";

interface ChangeAvatarProps {
    handleAvatarUploaded?: (event: ChangeEvent<HTMLInputElement>) => void;
}


const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ handleAvatarUploaded }) => {
    const theme = useTheme();
    const [file, setFile] = useState<File | any>(null);
    const [fileLoaded, setFileLoaded] = useState<boolean>(false);
    const [imagemPerfilUsuario, setImagemPerfilUsuario] = useState<ImagemPerfilUsuarioVM | any>(null);
    const { debounce } = useDebounce();
    const [refreshAvatar, setRefreshAvatar] = useState<boolean>(false); 

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
    }, [refreshAvatar]); 

    const handleImagePerfil = () => {
        if (file !== null) {
            if (imagemPerfilUsuario === null) {
                ImagemPerfilUsuarioService.createImagemPerfilUsuario(file)
                    .then((result) => {
                        if (result.message === true) {
                            alert("Imagem de perfil usuário incluída com sucesso");
                            setRefreshAvatar(!refreshAvatar); 
                            setFile(null); 
                            setFileLoaded(false); 
                            setImagemPerfilUsuario(result.imagemPerfilUsuario);
                        }
                    });
            } else {
                ImagemPerfilUsuarioService.updateImagemPerfilUsuario(file)
                    .then((result) => {
                        if (result.message === true) {
                            alert("Imagem de perfil usuário alterada com sucesso");
                            setRefreshAvatar(!refreshAvatar); 
                            setFile(null); 
                            setFileLoaded(false);                             
                            setImagemPerfilUsuario(result.imagemPerfilUsuario);
                        }
                    });
            }
        }
    };


    const handleDeleteImagePerfil = async () => {
        await ImagemPerfilUsuarioService.deleteImagemPerfilUsuario()
            .then((result) => {
                if (result.message === true) {
                    alert("Imagem de perfil usuário excluída com sucesso");
                    setRefreshAvatar(!refreshAvatar);
                    setFile(null);
                    setFileLoaded(false);
                    setImagemPerfilUsuario(null);
                }
            });

    };

    const getRandomQueryParameter = (): string => {
        return `?${Math.random().toString(36).substring(7)}`;
    };

    const avatarSrc = imagemPerfilUsuario !== null ? `${imagemPerfilUsuario.url}${getRandomQueryParameter()}` : "/assets/imagem_Perfil.png";

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
                        src={avatarSrc}
                        key={refreshAvatar ? "avatar-refresh" : "avatar"} 
                    />
                </InputLabel>
                {fileLoaded && <span style={{ color: 'green', marginBottom: '1em' }}>Arquivo carregado com sucesso!</span>}
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
                <Button
                    style={{ marginLeft: '2em' }}
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteImagePerfil}
                >
                    Excluir
                </Button>
            </Box>
        </Box>
    );
}

export default ChangeAvatar;
