import  createApiInstance   from "../../axios-config";
const Api = createApiInstance();



export interface ControleAcessoVM {
    Nome: string;
    SobreNome: string;
    Telefone: string;
    Email: string;
    Senha: string;
    ConfirmaSenha: string;
} 

export interface LoginVM {
    IdUsuario: number;
    Email:string; 
    Senha: string;
     ConfirmaSenha: string;        
} 


const auth = async (email: string, password: string): Promise<any> => {
    try {        
        let dados = { Email: email,  Senha: password };        

        const  { data } = await Api.post('/ControleAcesso/SignIn', dados);
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
        const  { data } = await Api.get('/ControleAcesso/RecoveryPassword/' + email);
        if (data) {
            return data;
        }

        return Error('Erro ao enviar email.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro ao enviar email.');
    }

}

const createUsuario = async (dados: Omit<ControleAcessoVM, ''>):  Promise<any | Error> => {
    try {
        const  { data } = await Api.post('/ControleAcesso', dados);
        if (data) {
            return data.message;
        }

        return Error('Erro Authservices ao criar usuário.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro Authservices ao criar usuário.');
    }

};

const changePassword = async (password: string): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const idUsuario = localStorage.getItem('idUsuario');

        if (accessToken !== undefined && idUsuario !== undefined)
        {   
            let dados = { idUsuario: localStorage.getItem('idUsuario') ,  Senha: password };        
            const  { data } = await Api.post('/ControleAcesso/ChangePassword', dados, {headers: { Authorization: `Bearer ${localStorage.getItem('@dpApiAccess') || ''}` }} );
            if (data) {
                return data;
            }
        }

        return Error('Erro ao enviar email.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro ao enviar email.');
    }
};

export const AuthService = { 
    auth,
    recoveryPassword,
    createUsuario,
    changePassword
};