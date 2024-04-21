import { Despesa } from "../../models";
import createApiInstance from "../axios-config";

const Api = createApiInstance();

const getAll = async (): Promise<Despesa[] | any | Error> => {
    try {
        const { data } = await Api.get('/despesa');
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getById = async (id: number): Promise<Despesa | any | Error> => {
    try {
        const { data } = await Api.get(`/despesa/GetById/${id}`);
        if (data) {
            return data.despesa as Despesa;
        }
    } catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<Despesa, 'id'>): Promise<any | Error> => {
    try {
        const { data } = await Api.post<Despesa>('/despesa', dados);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: Despesa): Promise<Despesa | any | Error> => {
    try {
        dados.id = id;
        const { data } = await Api.put<Despesa>('/despesa', dados);
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