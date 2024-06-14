import { environment } from "../../../environment";
import { ControleAcesso, Auth } from "../../../models";
import createApiInstance from "../../axios-config";
import axios from 'axios';

const Api = createApiInstance();

const auth = async (email: string, password: string): Promise<any> => {
    try {
        let dados = { Email: email, Senha: password };

        const { data } = await Api.post('/ControleAcesso/SignIn', dados);
        if (data) {
            return data;
        }

        return Error('Erro services Auth.');
    } catch (error) {

        console.log(error);
        return error || 'Erro services Auth.';
    }
};

const recoveryPassword = async (email: string): Promise<any> => {
    try {
        const { data } = await Api.post('/ControleAcesso/RecoveryPassword', email);
        if (data) {
            return data;
        }

        return Error('Erro ao enviar email.');
    } catch (error) {

        console.log(error);
        return error || 'Erro ao enviar email.';
    }

}

const createUsuario = async (dados: Omit<ControleAcesso, ''>): Promise<any | Error> => {
    try {
    const { data } = await axios.post<any>(`${ environment.URL_BASE }/ControleAcesso`, dados);
        if (data) return data;   

    } catch (error) {

        return error
    }
};

const changePassword = async (password: string, confirmaSenha: string): Promise<any> => {
    try {
        let dados = { senha: password, ConfirmaSenha: confirmaSenha };
        const { data } = await Api.post('/ControleAcesso/ChangePassword', dados);
        if (data) return data;
    } catch (error) {
        return error;
    }
};

const refreshToken = async (refreshToken: string): Promise<Auth | any>  => {
    try {
        const { data } = await axios.get(`${ environment.URL_BASE }/ControleAcesso/refresh/${refreshToken}`);
        return data;
    } catch (error) {
        console.error('Erro ao atualizar o token:', error);
    }
};

export const AuthService = {
    auth,
    recoveryPassword,
    createUsuario,
    changePassword,
    refreshToken
};