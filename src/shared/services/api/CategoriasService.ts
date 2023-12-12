import { ICategoriaVM } from '../../interfaces';
import createapiInstance from '../axios-config';

const api = createapiInstance();

const getAll = async (): Promise<ICategoriaVM[] | any | Error> => {
    try {
        const { data } = await api.get('/Categoria');
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getById = async (idCategoria: number): Promise<ICategoriaVM | any | Error> => {
    try {
        const { data } = await api.get('/Categoria/GetById/' + idCategoria);
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

const getByTipoCategoria = async (idTipoCategoria: number): Promise<ICategoriaVM[] | any | Error> => {
    try {
        const { data } = await api.get(`/Categoria/GetByTipoCategoria/${idTipoCategoria}`);
        if (data) {
            return data;
        }

        return Error('Erro getByTipoCategoria ao pesquisar Categorias.');
    } catch (error) {
        console.log(error);
    }
};

const create = async (dados: Omit<ICategoriaVM, 'id'>): Promise<any | Error> => {
    try {
        const { data } = await api.post<ICategoriaVM>('/Categoria', dados);
        if (data) {
            return data
        }

        return Error('Erro ao criar novo registro de Categoria.');
    } catch (error) {
        console.log(error);
    }
};

const updateById = async (id: number, dados: ICategoriaVM): Promise<any | any | Error> => {
    try {
        dados.id = id;
        const { data } = await api.put<ICategoriaVM>('/Categoria', dados);
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de Categoria.');
    } catch (error) {
        console.log(error);
    }

};

const deleteById = async (id: number): Promise<any | Error> => {
    try {
        const { data } = await api.delete(`/Categoria/${id} `);
        if (data) {
            return Boolean(data.message)
        }

        return Error('Erro ao deletar registro de Categoria.');
    } catch (error) {
        console.log(error);
    }

};

export const CategoriasService = {
    getAll,
    getById,
    getByTipoCategoria,
    create,
    updateById,
    deleteById
};