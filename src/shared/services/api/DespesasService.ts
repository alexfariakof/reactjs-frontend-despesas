import  createApiInstance   from "../axios-config";
import { Dayjs } from "dayjs";

const Api = createApiInstance();
export interface IDespesaVM {
    id:number;
    idUsuario: number;
    idCategoria: number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
    dataVencimento: Dayjs | null;
}

const getAll = async (): Promise<IDespesaVM[] | Error> => {
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/despesa', {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro ao listar despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao listar despesas.');
    }
};

const getById = async (id: number): Promise<IDespesaVM | Error> => {
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/despesa/GetById/' + id, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data.despesa as IDespesaVM;
        }

        return Error('Erro ao pesquisar despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao pesquisar despesas.');
    }
};

const getByIdUsuario = async (idUsuario: number): Promise<IDespesaVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/despesa/GetByIdUsuario/' + idUsuario, {
            headers: {
                 Authorization: `Bearer ${accessToken}` 
                }
            });
        if (data) {
            return data;
        }

        return Error('Erro getByIdUsuario ao listar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getByIdusuario ao listar Categorias.');
    }
};

const create = async (dados: Omit<IDespesaVM, 'id'>): Promise<any | Error> => {
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.post<IDespesaVM>('/despesa', dados, {headers: { Authorization: `Bearer ${accessToken}` }} );
        if (data) {
            return data;
        }

        return Error('Erro ao criar novo registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de despesas.');
    }
};

const updateById = async (id: number, dados: IDespesaVM): Promise<IDespesaVM | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        dados.id = id;        
        const { data } = await Api.put<IDespesaVM>('/despesa', dados, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de despesas.');
    }

 };

const deleteById = async (id: number): Promise<any | Error> => { 
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.delete('/despesa/'+ id, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data.message === true) {
            return Boolean(data.message);
        }

        return Error('Erro ao deletar registro de despesas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de despesas.');
    }

};

export const DespesasService = {
    getAll,
    getById,
    getByIdUsuario,
    create,
    updateById,
    deleteById
};