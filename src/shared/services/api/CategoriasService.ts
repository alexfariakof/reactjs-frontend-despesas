import createapiInstance from "../axios-config";
import { faker } from '@faker-js/faker';

const api = createapiInstance();

export interface ICategoriaVM {
  id: number;
  descricao: string;
  idUsuario: number;
  idTipoCategoria: number;
}

const generateFakeCategoria = (): ICategoriaVM => {
  return {
    id: faker.datatype.number({'min': 2, 'max': 14 }),
    descricao: faker.helpers.arrayElement(["Alimentação","Benefício","Casa","Imposto","Investimento","Lazer","Outros","Prêmio","Salário","Saúde","Serviços","Transporte"]),
    idUsuario: 1,
    idTipoCategoria: faker.datatype.number({'min': 1, 'max': 2 }),
  };
};

const getAll = async (): Promise<ICategoriaVM[] | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fakeCategorias: ICategoriaVM[] = Array.from({ length: 10 }, () => generateFakeCategoria());
    return fakeCategorias;
  } catch (error) {
    console.log(error);
    return Error('Erro getAll ao listar Categorias.');
  }
};

const getById = async (idCategoria: number): Promise<ICategoriaVM | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fakeCategoria: ICategoriaVM = generateFakeCategoria();
    return fakeCategoria;
  } catch (error) {
    console.log(error);
    return Error('Erro getById ao pesquisar Categorias.');
  }
};

const getByIdUsuario = async (idUsuario: number): Promise<ICategoriaVM[] | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fakeCategorias: ICategoriaVM[] = Array.from({ length: 5 }, () => generateFakeCategoria());
    return fakeCategorias;
  } catch (error) {
    console.log(error);
    return Error('Erro getByIdUsuario ao listar Categorias.');
  }
};

const getByTipoCategoria = async (idUsuario: number, idTipoCategoria: number): Promise<ICategoriaVM[] | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (idTipoCategoria === 1) {
        const categorias: ICategoriaVM[] = [
            { id: 2, descricao: "Alimentação", idUsuario: 1, idTipoCategoria: 1 },
            { id: 3, descricao: "Benefício", idUsuario: 1, idTipoCategoria: 1 },
            { id: 4, descricao: "Casa", idUsuario: 1, idTipoCategoria: 1 },
            { id: 5, descricao: "Imposto", idUsuario: 1, idTipoCategoria: 1 },
            { id: 6, descricao: "Investimento", idUsuario: 1, idTipoCategoria: 1 },
            { id: 7, descricao: "Lazer", idUsuario: 1, idTipoCategoria: 1 },
            { id: 8, descricao: "Outros", idUsuario: 1, idTipoCategoria: 1 },
        ];

        return categorias;
    }
    else{
      const categorias: ICategoriaVM[] = [

          { id: 9, descricao: "Prêmio", idUsuario: 1, idTipoCategoria: 2 },
          { id: 10, descricao: "Salário", idUsuario: 1, idTipoCategoria: 2 },
          { id: 11, descricao: "Saúde", idUsuario: 1, idTipoCategoria: 2 },
          { id: 12, descricao: "Serviços", idUsuario: 1, idTipoCategoria: 2 },
          { id: 13, descricao: "Transporte", idUsuario: 1, idTipoCategoria: 2 },
          { id: 14, descricao: "Outros", idUsuario: 1, idTipoCategoria: 2 }
        ];
      return categorias;
    }
  } catch (error) {
    console.log(error);
    return Error('Erro getByTipoCategoria ao pesquisar Categorias.');
  }
};

const create = async (dados: Omit<ICategoriaVM, 'id'>): Promise<any | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const fakeCategoria: ICategoriaVM = generateFakeCategoria();
    return fakeCategoria;
  } catch (error) {
    console.log(error);
    return Error('Erro ao criar novo registro de Categoria.');
  }
};

const updateById = async (id: number, dados: ICategoriaVM): Promise<any | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const updatedCategoria: ICategoriaVM = { ...dados, id };
    return updatedCategoria;
  } catch (error) {
    console.log(error);
    return Error('Erro ao atualizar registro de Categoria.');
  }
};

const deleteById = async (id: number): Promise<any | Error> => {
  try {
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: 'Registro de Categoria deletado com sucesso.' };
  } catch (error) {
    console.log(error);
    return Error('Erro ao deletar registro de Categoria.');
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
