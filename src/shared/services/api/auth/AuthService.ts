import { ControleAcessoVM } from "../../../interfaces";
import createApiInstance from "../../axios-config";

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
        return Error((error as { message: string }).message || 'Erro services Auth.');
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
        return Error((error as { message: string }).message || 'Erro ao enviar email.');
    }

}

const createUsuario = async (dados: Omit<ControleAcessoVM, ''>): Promise<any | Error> => {
    try {
        const { data } = await Api.post('/ControleAcesso', dados);
        if (data) {
            return data.message;
        }

        return Error('Erro Authservices ao criar usuário.');
    } catch (error) {

        console.log(error);
        return Error((error as { message: string }).message || 'Erro Authservices ao criar usuário.');
    }
};

const changePassword = async (password: string, confirmaSenha: string): Promise<any> => {
    try {
        let dados = { senha: password, ConfirmaSenha: confirmaSenha };
        const { data } = await Api.post('/ControleAcesso/ChangePassword', dados);
        if (data) {
            return data.message;
        }

    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar senha.');
    }
};

export const AuthService = {
    auth,
    recoveryPassword,
    createUsuario,
    changePassword
};