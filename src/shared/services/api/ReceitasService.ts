import  createApiInstance   from "../axios-config";
import { Dayjs } from "dayjs";

const Api = createApiInstance();
export interface IReceitaVM {
    id:number;
    idUsuario: number;
    idCategoria: Number;
    data: Dayjs | null;
    descricao: string;
    valor: number;
}

const getAll = async (): Promise<IReceitaVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Receita', {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar receitas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar receitas.');
    }
};

const getById = async (id: Number): Promise<IReceitaVM | Error> => {
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Receita/GetById/' + id, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data.receita as IReceitaVM;
        }

        return Error('Erro getById ao pesquisar receitas.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar receitas.');
    }
};

const getByIdUsuario = async (idUsuario: number): Promise<IReceitaVM[] | Error> => {
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


const create = async (dados: Omit<IReceitaVM, 'id'>): Promise<any | Error> => {
    try {        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.post<IReceitaVM>('/Receita', dados, {headers: { Authorization: `Bearer ${accessToken}` }} );
        if (data) {
            return data.id
        }

        return Error('Erro ao criar novo registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de receita.');
    }
};


const updateById = async (id: number, dados: IReceitaVM): Promise<IReceitaVM | Error> => {
    try {        
        dados.id = id;        
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.put<IReceitaVM>('/Receita', dados, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de receita.');
    }

 };

const deleteById = async (id: number): Promise<any | Error> => { 
    try {     
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');   
        const { data } = await Api.delete('/Receita/' + id, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data.message) {
            return Boolean(data)
        }

        return Error('Erro ao deletar registro de receita.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de receita.');
    }

};

export const ReceitasService = {
    getAll,
    getById,
    getByIdUsuario,
    create,
    updateById,
    deleteById
};