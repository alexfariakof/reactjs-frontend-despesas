import { createContext, useCallback, useState, useContext, useMemo, useEffect } from "react";
import { AuthService } from "../services/api";
import dayjs from "dayjs";
import { ControleAcesso } from "../models";
import { TokenStorageService }  from "../services/token-storage/token.storage.service"; 

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
  recoveryPassword: (email: string) => Promise<string | void>;
  createUsuario: (
    nome: string,
    sobreNome: string,
    telefone: string,
    email: string,
    senha: string,
    ConfirmaSenha: string
  ) => Promise<string | void>;
}

interface IAuthProviderProps {  children: React.ReactNode; }

const AuthContext = createContext({} as IAuthContextData);
const tokenStorageService = new TokenStorageService(); 

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = tokenStorageService.getToken();
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result.authenticated === true) {
      tokenStorageService.saveToken(result.accessToken);
      tokenStorageService.saveRefreshToken(result.refreshToken);
      tokenStorageService.saveUser(result);
      setAccessToken(result.accessToken);
    } else {
      alert("Email ou Senha inválidos!");
    }
  }, []);

  const handleLogout = useCallback(() => {
    setAccessToken(undefined);
    tokenStorageService.signOut();
  }, []);

  const handleRecoveryPassword = useCallback(async (email: string) => {
    const result = await AuthService.recoveryPassword(email);
    if (result instanceof Error) {
      return result.message;
    }
  }, []);

  const handleCreateUsuario = useCallback(
    async (
      nome: string,
      sobreNome: string,
      telefone: string,
      email: string,
      senha: string,
      confirmaSenha: string
    ) => {
      let data: ControleAcesso;
      data = {
        Nome: nome,
        SobreNome: sobreNome,
        Telefone: telefone,
        Email: email,
        Senha: senha,
        ConfirmaSenha: confirmaSenha,
      };

      const result = await AuthService.createUsuario(data);
      if (result instanceof Error) {
        return result.message;
      }
      return result;
    },
    []
  );

  const handleIsAuthenticated = useMemo(() => {
    const expiration = dayjs(tokenStorageService.getUser().expiration);
    const dataAtual = dayjs();
    try {
      if (expiration <= dataAtual) {
        tokenStorageService.refreshToken();
      }
      return !!accessToken;
    } catch {
      tokenStorageService.signOut();
      return false;
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: handleIsAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        recoveryPassword: handleRecoveryPassword,
        createUsuario: handleCreateUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
