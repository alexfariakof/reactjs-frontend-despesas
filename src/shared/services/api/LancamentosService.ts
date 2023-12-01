import { Dayjs } from "dayjs";
import  createApiInstance   from "../axios-config";
const Api = createApiInstance();
export interface ILancamentoVM {
    id: number;
    idUsuario: number;
    idDespesa: number;
    idReceita: number;
    data: string;
    tipoCategoria: string;
    categoria: string;
    descricao: string;
    valor: number;
} 

const getByMesAnoByIdUsuario = async (mesano: Dayjs, idUsuario:number): Promise<any> => {
    try {
        var mesAno = mesano.toISOString().substring(0, 7);
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const  { data } = await Api.get('/lancamento/' + mesAno + '/' + idUsuario, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }
    } 
    catch (error) {
         console.log(error);
    }
};

const getSaldoByIdUsuario = async (): Promise<any | 0> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const idUsuario = Number(localStorage.getItem('idUsuario'));
        const { data } = await Api.get('/lancamento/Saldo/' + idUsuario, {headers: { Authorization: `Bearer ${accessToken}` }});
        return data;
    } 
    catch (error) {
        console.log(error);
    }
};

const getDadosGraficoByAnoByIdUsuario = async (mesano: Dayjs | null, idUsuario:number): Promise<any | []> => {
    try {
        var mesAno = mesano?.toISOString().substring(0, 7);
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const  { data } = await Api.get('/lancamento/GetDadosGraficoByAnoByIdUsuario/' + mesAno + '/' + idUsuario, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }
    } 
    catch (error) {
         console.log(error);
    }

};

export const LancamentosService = {
    getByMesAnoByIdUsuario,
    getSaldoByIdUsuario,
    getDadosGraficoByAnoByIdUsuario
};