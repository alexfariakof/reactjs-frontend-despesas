import  createApiInstance   from "../axios-config";
const Api = createApiInstance();

export interface IUsuarioVM {
    Id:number;
    Nome: string;
    Telefone: string;
    Email: string;
}

const getAll = async (): Promise<IUsuarioVM[] | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Usuario', {headers: { Authorization: `Bearer ${accessToken}` }});        
        if (data) {
            return data;
        }

        return Error('Erro getAll ao listar Usuarios.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getAll ao listar Usuarios.');
    }
};

const getById = async (id: Number): Promise<IUsuarioVM | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.get('/Usuario/$(id)', {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data;
        }

        return Error('Erro getById ao pesquisar Usuarios.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro getById ao pesquisar Usuarios.');
    }
};

const create = async (dados: Omit<IUsuarioVM, 'id'>): Promise<number | Error> => {
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.post<IUsuarioVM>('/Usuario', dados, {headers: { Authorization: `Bearer ${accessToken}` }} );
        if (data) {
            return data.Id
        }

        return Error('Erro ao criar novo registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao criar novo registro de Usuario.');
    }
};


const updateById = async (id: number, dados: IUsuarioVM): Promise<IUsuarioVM | Error> => {
    try {
        dados.Id = id;
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.put<IUsuarioVM>('/Usuario', dados, {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data
        }

        return Error('Erro ao atualizar registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao atualizar registro de Usuario.');
    }

 };

const deleteById = async (id: number): Promise<void | Error> => { 
    try {
        const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');
        const { data } = await Api.delete('/Usuario/$(id)', {headers: { Authorization: `Bearer ${accessToken}` }});
        if (data) {
            return data.id
        }

        return Error('Erro ao deletar registro de Usuario.');
    } catch (error) {
        console.log(error);
        return Error((error as { message: string }).message || 'Erro ao deletar registro de Usuario.');
    }
};

export const UsuariosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};