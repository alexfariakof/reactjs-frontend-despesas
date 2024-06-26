import { useRef } from 'react';
import { Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography, Avatar, Checkbox, Paper } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box } from "@mui/system";
import { FormControlLabel } from '@mui/material'
import { useAuthContext } from "../../contexts";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Modal from '@mui/material/Modal';
import SaveIcon from '@mui/icons-material/Save';
import { Facebook, GitHub, LinkedIn } from '@mui/icons-material';
interface ILoginProps {
    children: React.ReactNode;
}

interface State {
    email: string;
    password: string;
    showPassword: boolean;
}


export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login, recoveryPassword, createUsuario } = useAuthContext();
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    const [values, setValues] = useState<State>({
        email: 'teste@teste.com',
        password: '12345T!',
        showPassword: false,
    });


    interface IPrimeiroAcesso {
        nome: string;
        sobreNome: string;
        telefone: string;
        email: string;
        password: string
        showPassword: boolean;
        cPassword: string;        
        showCPassword: boolean;

    }     

    const [valuesPA, setValuesPA] = useState<IPrimeiroAcesso>({
        nome: '',
        sobreNome: '',
        telefone: '',
        email: '',
        password:'',        
        showPassword: false,
        cPassword:'',        
        showCPassword: false,
    });

    

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChangePA = (prop: keyof IPrimeiroAcesso) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesPA({ ...valuesPA, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleClickShowPAPassword = () => {
        setValuesPA({
            ...valuesPA,
            showPassword: !valuesPA.showPassword,
        });
    };

    const handleClickShowPACPassword = () => {
        setValuesPA({
            ...valuesPA,
            showCPassword: !valuesPA.showCPassword,
        });
    };

  

    const handleSubmit = () => {
        if (!values.email) {
            alert("O campo de email está vazio ou nulo.");
            setEmail();
            return false;
        } else if (!isValidEmail(values.email)) {
            alert("O email inserido não é um email válido.");
            setEmail();
            return false;

        } else {
            login(values.email, values.password);
        }        
    }

    const emailRef = useRef<HTMLInputElement | null>(null);
    const [emailError, setEmailError] = useState(false);
  
    const setEmail = () => {
      setEmailError(true);
      if (emailRef.current) {
        emailRef.current.focus();
      }
    };

    const handleSubmitRecoveryPassword = () => {
        if (!values.email) {
            alert("O campo de email está vazio ou nulo.");
            setEmailError(true);
            emailRef.current?.focus();
            return false;
        } else if (!isValidEmail(values.email)) {
            alert("O email inserido não é email válido.");
            setEmailError(true);
            emailRef.current?.focus();
            return false;
        } 

        recoveryPassword(values.email);    
        setEsqueciSenhaOpen(true);    
    } 

    const handleSubimitCreateUsuario = () => {
        if (!valuesPA.email) {
            alert("O campo de email está vazio ou nulo.");
            return false;
        } else if (!isValidEmail(valuesPA.email)) {
            alert("O email inserido não é email válido.");
            return false;
        }  else if (valuesPA.password !== valuesPA.cPassword){
            alert("Campo Senha e Confirma Senha são diferentes!!");
            return false;
        }
        createUsuario(valuesPA.nome, valuesPA.sobreNome, valuesPA.telefone, valuesPA.email, valuesPA.password, valuesPA.cPassword).then((response: any | Error) => {
            if (response instanceof Error) {
                alert(response);
            } 
            else if (response) {
                alert('Usuário cadastrado com sucesso!');
                valuesPA.nome = '';
                valuesPA.sobreNome = '';
                valuesPA.telefone = '';
                valuesPA.email = '';
                valuesPA.password = '';
                valuesPA.showPassword = false;
                valuesPA.cPassword = '';
                valuesPA.showCPassword = false;                
                handlePrimeiroAcessoClose();
            }
        });        
    }

    const Footer = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "auto",
                    backgroundColor: "#f5f5f5",
                    borderTop: "1px solid #ddd",
                    textAlign: "center",
                    width: "100%",
                    position: "fixed",
                    bottom: "0",
                    color: "green",
                    fontSize: "2rem"
                }}

            >
                <Box  >
                    <section className="mb-2">
                        {/* Facebook */}
                        <Link
                            className=" btn-floating m-2 border-0 bg-transparent"
                            target="_blank"
                            href="https://www.facebook.com/alex.ribeiro.noeh/"
                        >
                            <Facebook  />
                        </Link>
                        {/* Linkedin */}
                        <Link
                            className=" btn-floating m-2 border-0 bg-transparent"
                            target="_blank"
                            href="https://www.linkedin.com/in/alex-ribeiro-de-faria-b3376b26/"
                        >
                            <LinkedIn  />
                        </Link>
                        {/* Github */}
                        <Link
                            className=" btn-floating m-2 border-0 bg-transparent"
                            target="_blank"
                            href="https://github.com/alexfariakof"
                        >
                            <GitHub  />
                        </Link>
                    </section>
                </Box>
                <Box
                >
                    <Typography variant="body2">
                        &copy; 2023 Honey TI. Todos os direitos reservados - Desenvolvido por
                        Alex Ribeiro de Faria
                    </Typography>
                </Box>
            </Box>
        );
    };


    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const [openPrimeiroAcesso, setPrimeiroAcessoOpen] = useState(false);
    const [openEsqueciSenha, setEsqueciSenhaOpen] = useState(false);
    const handlePrimeiroAcessoOpen = () => { setPrimeiroAcessoOpen(true); };
    const handlePrimeiroAcessoClose = () => setPrimeiroAcessoOpen(false);
    const handleEsqueciSenhaOpen = () => { handleSubmitRecoveryPassword(); };
    const handleEsqueciSenhaClose = () => setEsqueciSenhaOpen(false);

    if (isAuthenticated) {
        return (<>{children}</>);
    }
    else {
        return (
            <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center' >
                <Card>
                    <CardContent>
                        <Box display='flex' flexDirection='column' gap={2} width={250}   >
                            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                                <Typography variant="h4" align="center">Identifique-se</Typography>
                            </Box>

                            <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth
                                value={values.email}
                                onChange={handleChange('email')}
                                inputRef={emailRef} 
                                error={emailError}                          
                            />
                            <FormControl size="small" fullWidth variant="outlined" >
                                <InputLabel htmlFor="txtPassword">Senha</InputLabel>
                                <OutlinedInput
                                    id="txtPassword"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    onKeyUp={handleKeyPress}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Lembre-me"
                            />
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box width='100%' display='flex' flexDirection='column' gap={2} justifyContent='center' >
                            <Button variant="contained" onClick={() => handleSubmit()}>
                                Entrar
                            </Button>
                            <Typography >
                                <Link href='#' onClick={() => handleEsqueciSenhaOpen()} >Esqueci minha senha</Link>
                            </Typography >
                            <Typography>
                                <Link href='#' onClick={() => handlePrimeiroAcessoOpen()}  >Primeiro Acesso </Link>
                            </Typography>
                        </Box>
                    </CardActions>
                </Card>
                <Footer />
                <Modal
                    open={openEsqueciSenha}
                    onClose={handleEsqueciSenhaClose}
                    aria-labelledby="modal-esqueci-minha-senha"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        gap={1}
                        margin={2}
                        padding={1}
                        paddingX={2}
                        width="50vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        component={Paper} >
                        <Typography id="mmodal-esqueci-minha-senha" variant="h6" component="h2">
                            Esqueci minha senha
                        </Typography>
                        <Typography id="modal-modal-description" gap={2}>
                            Prezado(a) ,
                            Enviamos um e-mail com instruções de redefinição da sua senha para o email {values.email}.
                            Se não encontrá-lo na caixa de entrada, verifique a lixeira ou a caixa de spam.
                            Se não possui mais acesso a esse endereço de e-mail , entre em contato conosco.
                        </Typography>
                        <Box width='100%' display='flex' flexDirection='column' gap={2} justifyContent='center' marginTop={2} >
                            <Button variant="contained" onClick={() => handleEsqueciSenhaClose()}>OK</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={openPrimeiroAcesso}
                    onClose={handlePrimeiroAcessoClose}
                    aria-labelledby="modal-primeiro-acesso"
                    aria-describedby="modal-modal-description"                    
                >
                    <Box
                        gap={1}
                        margin={2}
                        padding={1}
                        paddingX={2}
                        width="80vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        component={Paper} >

                        <TextField size="small" label="Nome" inputProps={{ maxLength: 50 }} fullWidth
                            value={valuesPA.nome}
                            onChange={handleChangePA('nome')}
                            onKeyUp={handleKeyPress}
                        />
                        <TextField size="small" label="Sobre Nome" inputProps={{ maxLength: 50 }} fullWidth
                            value={valuesPA.sobreNome}
                            onChange={handleChangePA('sobreNome')}
                            onKeyUp={handleKeyPress}
                        />

                        <TextField size="small" label='Telefone' inputProps={{ maxLength: 15, type: 'tel' }} fullWidth 
                            value={valuesPA.telefone}
                            onChange={handleChangePA('telefone')}
                            onKeyUp={handleKeyPress}                       
                        />
                        <TextField size="small" label='Email' inputProps={{ maxLength: 50, type: 'email' }} fullWidth
                            value={valuesPA.email}
                            onChange={handleChangePA('email')}
                            onKeyUp={handleKeyPress}                       
                         />
                        <FormControl size="small" fullWidth variant="outlined" >
                            <InputLabel htmlFor="txtPAPassword">Senha</InputLabel>
                            <OutlinedInput
                                id="txtPAPassword"
                                type={valuesPA.showPassword ? 'text' : 'password'}
                                value={valuesPA.password}
                                onChange={handleChangePA('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPAPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {valuesPA.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                type={valuesPA.showCPassword ? 'text' : 'password'}
                                value={valuesPA.cPassword}
                                onChange={handleChangePA('cPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPACPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {valuesPA.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirma Senha"
                                inputProps={{ maxLength: 50 }}
                            />
                        </FormControl>
                        <Button color='primary' disableElevation variant='contained' startIcon={<SaveIcon />} onClick={handleSubimitCreateUsuario} >Salvar</Button>
                    </Box>
                </Modal>                  
            </Box>         
            
        );
    }
}