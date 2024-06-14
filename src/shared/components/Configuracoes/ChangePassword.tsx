import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import { AuthService } from "../../services/api";
import { useAuthContext } from "../../contexts";
interface ITrocaSenha {
    password: string
    showPassword: boolean;
    cPassword: string;
    showCPassword: boolean;
}

const ChangePassword: React.FC = () => {
    const { logout } = useAuthContext();
    const [valuesTC, setValuesTC] = useState<ITrocaSenha>({
        password: '',
        showPassword: false,
        cPassword: '',
        showCPassword: false

    });


    const handleChangeTC = (prop: keyof ITrocaSenha) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesTC({ ...valuesTC, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValuesTC({
            ...valuesTC,
            showPassword: !valuesTC.showPassword,
        });
    };

    const handleClickShowTCCPassword = () => {
        setValuesTC({
            ...valuesTC,
            showCPassword: !valuesTC.showCPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChangePassword = () => {
        if (valuesTC.password !== valuesTC.cPassword) {
            alert("Campo Senha e Confirma Senha são diferentes!!");
            return false;
        }
        else {

            AuthService.changePassword(valuesTC.password, valuesTC.cPassword)
                .then((response) => {
                    if (response instanceof Error) {
                        alert("Erro ao alterar Senha!");
                    }          
                    else {
                        alert("Senha alterada com sucesso");
                        logout();
                    }
                });
        }
    }

    return (
        <Box
            gap={1}
            margin={1}
            marginTop={0}
            padding={1}
            paddingX={2}
            height="auto"
            display="flex"
            flexDirection="column"
            alignItems="start"
            component={Paper} >
            <Typography variant='h6'>
                Trocar Senha
            </Typography>
            <FormControl size="small" fullWidth variant="outlined" >
                <InputLabel htmlFor="txtTCPassword">Senha</InputLabel>
                <OutlinedInput
                    id="txtTCPassword"
                    type={valuesTC.showPassword ? 'text' : 'password'}
                    value={valuesTC.password}
                    onChange={handleChangeTC('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {valuesTC.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Senha"
                    inputProps={{ maxLength: 50 }}
                />
            </FormControl>
            <FormControl size="small" fullWidth variant="outlined" >
                <InputLabel htmlFor="txtConfirmPassword">Confirma Senha</InputLabel>
                <OutlinedInput
                    id="txtConfirmPassword"
                    type={valuesTC.showCPassword ? 'text' : 'password'}
                    value={valuesTC.cPassword}
                    onChange={handleChangeTC('cPassword')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowTCCPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end" >
                                {valuesTC.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirma Senha"
                    inputProps={{ maxLength: 50 }}
                />
            </FormControl>
            <Button color='primary' disableElevation variant='contained' startIcon={<SaveIcon />} onClick={handleChangePassword} >Salvar</Button>
        </Box>


    );
}
export default ChangePassword;