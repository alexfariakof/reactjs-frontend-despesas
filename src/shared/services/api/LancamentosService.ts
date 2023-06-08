import  createApiInstance   from "../axios-config";
const Api = createApiInstance();


export interface ILancamentoVM {
    id: number;
    idUsuario: number;
    tipo: string;
    idDespesa: number;
    idReceita: number;
    valor: number;
    data: string;
    descricao: string;
    tipoCategoria: string;
} 

const getByMesAnoByIdUsuario = async (mesano: string, idUsuario:number): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const  { data } = await Api.get('/lancamento/' + mesano + '/' + idUsuario, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro ao pesquisar lançãmentos por ano mes.');
    } catch (error) {

         console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar lançamentos por ano mes.');
    }
};

const getSaldoByIdUsuario = async (): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const idUsuario = Number(localStorage.getItem('idUsuario'));
        const { data } = await Api.get('/lancamento/Saldo/' + idUsuario, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro ao pesquisar lançamentos por usuário.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar lançamentos por usuário.');
    }
};

export const LancamentosService = {
    getByMesAnoByIdUsuario,
    getSaldoByIdUsuario,
};