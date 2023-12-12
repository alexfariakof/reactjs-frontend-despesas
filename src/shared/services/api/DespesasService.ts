import { IDespesaVM } from "../../interfaces";
import createApiInstance from "../axios-config";

const Api = createApiInstance();

const getAll = async (): Promise<IDespesaVM[] | any | Error> => {
    try {
        const { data } = await Api.get('/despesa');
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getById = async (id: number): Promise<IDespesaVM | any | Error> => {
    try {
        const { data } = await Api.get(`/despesa/GetById/${id}`);
        if (data) {
            return data.despesa as IDespesaVM;
        }
    } catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<IDespesaVM, 'id'>): Promise<any | Error> => {
    try {
        const { data } = await Api.post<IDespesaVM>('/despesa', dados);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: IDespesaVM): Promise<IDespesaVM | any | Error> => {
    try {
        dados.id = id;
        const { data } = await Api.put<IDespesaVM>('/despesa', dados);
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error);
    }

};

const deleteById = async (id: number): Promise<any | Error> => {
    try {
        const { data } = await Api.delete(`/despesa/${id} `);
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