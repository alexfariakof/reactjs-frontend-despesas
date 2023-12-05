import createApiInstance from "../axios-config";
import { Dayjs } from "dayjs";

const Api = createApiInstance();
export interface IDespesaVM {
    id: number;
    idUsuario: number;
    idCategoria: number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
    dataVencimento: Dayjs | null;
}

const getAll = async (): Promise<IDespesaVM[] | any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/despesa', { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getById = async (id: number): Promise<IDespesaVM | any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/despesa/GetById/' + id, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data.despesa as IDespesaVM;
        }
    } catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<IDespesaVM, 'id'>): Promise<any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.post<IDespesaVM>('/despesa', dados, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: IDespesaVM): Promise<IDespesaVM | any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        dados.id = id;
        const { data } = await Api.put<IDespesaVM>('/despesa', dados, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error);
    }

};

const deleteById = async (id: number): Promise<any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.delete('/despesa/' + id, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data.message === true) {
            return Boolean(data.message);
        }
    } catch (error) {
        console.log(error);
    }

};

export const DespesasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};