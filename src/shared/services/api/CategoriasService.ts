import  createapiInstance   from "../axios-config";
const api = createapiInstance();

export interface ICategoriaVM {
    id:number;
    descricao: string;
    idUsuario: number;    
    idTipoCategoria : number;
}

const getAll = async (): Promise<ICategoriaVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.get('/Categoria', { headers: {Authorization: `Bearer ${accessToken}`}});
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar Categorias.');
    }
};

const getById = async (idCategoria: number): Promise<ICategoriaVM | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.get('/Categoria/GetById/' + idCategoria, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro getById ao pesquisar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar Categorias.');
    }
};

const getByIdUsuario = async (idUsuario: number): Promise<ICategoriaVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.get('/Categoria/GetByIdUsuario/' + idUsuario, {
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


const getByTipoCategoria = async (idUsuario: number, idTipoCategoria: number): Promise<ICategoriaVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.get('/Categoria/GetByTipoCategoria/' + idUsuario + '/' + idTipoCategoria, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro getByTipoCategoria ao pesquisar Categorias.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getByTipoCategoria ao pesquisar Categorias.');
    }
};

const create = async (dados: Omit<ICategoriaVM, 'id'>): Promise<any | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.post<ICategoriaVM>('/Categoria', dados, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data
        }

        return Error('Erro ao criar novo registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de Categoria.');
    }
};


const updateById = async (id: number, dados: ICategoriaVM): Promise<any | Error> => {
    try {
        dados.id = id;
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.put<ICategoriaVM>('/Categoria', dados, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de Categoria.');
    }

 };

const deleteById = async (id: number): Promise<any | Error> => { 
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await api.delete('/Categoria/' + id, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return Boolean(data.message)
        }

        return Error('Erro ao deletar registro de Categoria.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de Categoria.');
    }

};

export const CategoriasService = {
    getAll,
    getById,
    getByIdUsuario,
    getByTipoCategoria,
    create,
    updateById,
    deleteById
};