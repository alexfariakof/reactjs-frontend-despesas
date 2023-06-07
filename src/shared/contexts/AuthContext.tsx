import { createContext, useCallback, useState, useContext, useMemo, useEffect } from 'react';
import { AuthService, ControleAcessoVM } from '../services/api';

interface IAuthContextData {
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<string | void>;
    recoveryPassword: (email: string) =>  Promise<string | void>;
    createUsuario: (nome: string, sobreNome: string, telefone: string, email: string,  senha: string, ConfirmaSenha: string) =>  Promise<string | void>;
}

interface IAuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem('@dpApiAccess');

        if(accessToken){
            setAccessToken(JSON.parse(accessToken));
        }
        else{
            localStorage.clear();
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);
        if (result.authenticated === true) {
            localStorage.setItem('idUsuario', result.usuario.id);
            localStorage.setItem('@dpApiAccess', JSON.stringify(result.accessToken));   
            setAccessToken(result);           
        }
        else{
            alert("Email ou Senha inválidos!");
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('@dpApiAccess');
        setAccessToken(undefined);
        localStorage.clear();
    }, []);

    const handleRecoveryPassword = useCallback(async (email: string) => {
        const result = await AuthService.recoveryPassword(email);
        if (result instanceof Error){
            return result.message;
        }
    }, []);
 
    const handleCreateUsuario = useCallback(async (nome: string, sobreNome: string, telefone: string, email: string,  senha: string, confirmaSenha: string) => {

        let data: ControleAcessoVM;
        data = {Nome: nome, SobreNome: sobreNome, Telefone: telefone, Email: email, Senha: senha, ConfirmaSenha: confirmaSenha}        

        const result = await AuthService.createUsuario(data);
        if (result instanceof Error){
            return result.message;
        }
        return result;
    }, []);


    const handleIsAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: handleIsAuthenticated,
            login: handleLogin,
            logout: handleLogout,
            recoveryPassword: handleRecoveryPassword,
            createUsuario: handleCreateUsuario
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);