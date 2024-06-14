import { Dayjs } from "dayjs";
import createApiInstance from "../axios-config";

const Api = createApiInstance();

const getByMesAnoByIdUsuario = async (mesAno: Dayjs): Promise<any> => {
    try {
        const { data } = await Api.get(`/lancamento/${mesAno}`);
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
        const { data } = await Api.get('/Saldo');
        return data.saldo;
    }
    catch (error) {
        console.log(error);
    }
};

const getDadosGraficoByAnoByIdUsuario = async (mesAno: Dayjs | null): Promise<any | []> => {
    try {
        const { data } = await Api.get(`Graficos/Bar/ ${mesAno}`);
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