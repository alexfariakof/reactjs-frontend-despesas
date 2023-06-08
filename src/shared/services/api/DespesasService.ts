import createApiInstance from "../axios-config";
import { Dayjs } from "dayjs";
import { faker } from '@faker-js/faker';

const Api = createApiInstance();
export interface IDespesaVM {
  id: number;
  idUsuario: number;
  idCategoria: number;
  data: Dayjs | null;
  descricao: string;
  valor: number;
  dataVencimento: Dayjs | null;
}

const generateFakeDespesa = (): IDespesaVM => {
    return {
      id: faker.datatype.number({'min': 1, 'max': 2 }),
      idUsuario: 1,
      idCategoria: faker.datatype.number({'min': 2, 'max': 8 }),
      data: faker.date.past() as unknown as Dayjs,
      descricao: faker.helpers.arrayElement(["Alimentação","Benefício","Casa", "Imposto","Investimento", "Lazer", "Outros"]), 
      valor: faker.datatype.number(),
      dataVencimento: faker.date.future() as unknown as Dayjs,
    };
  };

const getAll = async (): Promise<IDespesaVM[] | Error> => {
  try {
    const fakeData: IDespesaVM[] = Array.from({ length: 10 }, generateFakeDespesa);
    return fakeData;
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || 'Erro ao listar despesas.');
  }
};

const getById = async (id: number): Promise<IDespesaVM | Error> => {
  try {
    const fakeData: IDespesaVM = generateFakeDespesa();
    return fakeData;
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || 'Erro ao pesquisar despesas.');
  }
};

const getByIdUsuario = async (idUsuario: number): Promise<IDespesaVM[] | Error> => {
  try {
    const fakeData: IDespesaVM[] = Array.from({ length: 5 }, generateFakeDespesa);
    return fakeData;
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || 'Erro getByIdUsuario ao listar Categorias.');
  }
};

const create = async (dados: Omit<IDespesaVM, 'id'>): Promise<any | Error> => {
  try {
    const fakeData: IDespesaVM = generateFakeDespesa();
    return fakeData;
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || 'Erro ao criar novo registro de despesas.');
  }
};

const updateById = async (id: number, dados: IDespesaVM): Promise<IDespesaVM | Error> => {
  try {
    const fakeData: IDespesaVM = generateFakeDespesa();
    fakeData.id = id;
    return fakeData;
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || 'Erro ao atualizar registro de despesas.');
  }
};

const deleteById = async (id: number): Promise<any | Error> => {
  try {
    return true;
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
