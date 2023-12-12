import { IReceitaVM } from "../../interfaces";
import createApiInstance from "../axios-config";

const Api = createApiInstance();
const endPoint = '/Receita';

const getAll = async (): Promise<IReceitaVM[] | any | Error> => {
    try {
        const { data } = await Api.get(endPoint);
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
        const { data } = await Api.get(`${endPoint}/GetById/${id}`);
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
        const { data } = await Api.post<IReceitaVM>(endPoint, dados);
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
        const { data } = await Api.put<IReceitaVM>(endPoint, dados);
        if (data) {
            return data
        }
    } catch (error) {
        console.log(error);
    }

};

const deleteById = async (id: number): Promise<any | Error> => {
    try {
        const { data } = await Api.delete(`${endPoint}/${id}`);
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