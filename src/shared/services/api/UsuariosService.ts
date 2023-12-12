import { IUsuarioVM } from "../../interfaces";
import createApiInstance from "../axios-config";

const Api = createApiInstance();

const getAll = async (): Promise<IUsuarioVM[] | any | Error> => {
    try {
        const { data } = await Api.get('/Usuario');
        if (data) {
            return data;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const getById = async (id: Number): Promise<IUsuarioVM | any | Error> => {
    try {
        const { data } = await Api.get(`/Usuario/${id}`);
        if (data) {
            return data;
        }
    }
    catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<IUsuarioVM, 'id'>): Promise<number | any | Error> => {
    try {
        const { data } = await Api.post<IUsuarioVM>('/Usuario', dados);
        if (data) {
            return data.Id
        }

    }
    catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: IUsuarioVM): Promise<IUsuarioVM | any | Error> => {
    try {
        dados.Id = id;
        const { data } = await Api.put<IUsuarioVM>('/Usuario', dados);
        if (data) {
            return data
        }
    }
    catch (error) {
        console.log(error);
    }

};

const deleteById = async (id: number): Promise<void | any | Error> => {
    try {
        const { data } = await Api.delete(`/Usuario/${id}`);
        if (data) {
            return data.id
        }
    }
    catch (error) {
        console.log(error);
    }
};

export const UsuariosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};