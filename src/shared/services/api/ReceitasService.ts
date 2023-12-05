import createApiInstance from "../axios-config";
import { Dayjs } from "dayjs";

const Api = createApiInstance();
export interface IReceitaVM {
    id: number;
    idUsuario: number;
    idCategoria: Number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
}

const getAll = async (): Promise<IReceitaVM[] | any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Receita', { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data;
        }

    }
    catch (error) {
        console.log(error);
    }
};

const getById = async (id: Number): Promise<IReceitaVM | any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Receita/GetById/' + id, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data.receita as IReceitaVM;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<IReceitaVM, 'id'>): Promise<any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.post<IReceitaVM>('/Receita', dados, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data) {
            return data.id
        }

    }
    catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: IReceitaVM): Promise<IReceitaVM | any | Error> => {
    try {
        dados.id = id;
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.put<IReceitaVM>('/Receita', dados, { headers: { Authorization: `Bearer ${accessToken}` } });
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
        const { data } = await Api.delete('/Receita/' + id, { headers: { Authorization: `Bearer ${accessToken}` } });
        if (data.message) {
            return Boolean(data)
        }
    }
    catch (error) {
        console.log(error);
    }
};

export const ReceitasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};