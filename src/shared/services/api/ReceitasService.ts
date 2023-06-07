import createApiInstance from "../axios-config";
import { Dayjs } from "dayjs";
import { faker } from "@faker-js/faker";

const Api = createApiInstance();

export interface IReceitaVM {
  id: number;
  idUsuario: number;
  idCategoria: number;
  data: Dayjs | null;
  descricao: string;
  valor: number;
}

const generateFakeReceita = (): IReceitaVM => {
  return {
    id: faker.datatype.number({'min': 1, 'max': 3 }),
    idUsuario: 1,
    idCategoria: faker.datatype.number({'min': 2, 'max': 15 }),
    data: faker.date.recent() as unknown as Dayjs,
    descricao: faker.helpers.arrayElement(["Outros","Prêmio","Salário","Saúde","Serviços","Transporte"]),
    valor: faker.datatype.float(),
  };
};

const getAll = async (): Promise<IReceitaVM[] | Error> => {
  try {
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Generate fake data
    const fakeData: IReceitaVM[] = Array.from({ length: 10 }, () => generateFakeReceita());

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (fakeData) {
      return fakeData;
    }

    return Error("Erro getAll ao listar receitas.");
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro getAll ao listar receitas.");
  }
};

const getById = async (id: number): Promise<IReceitaVM | Error> => {
  try {
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Generate fake data
    const fakeData: IReceitaVM = generateFakeReceita();

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (fakeData) {
      return fakeData;
    }

    return Error("Erro getById ao pesquisar receitas.");
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro getById ao pesquisar receitas.");
  }
};

const getByIdUsuario = async (idUsuario: number): Promise<IReceitaVM[] | Error> => {
  try {
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Generate fake data
    const fakeData: IReceitaVM[] = Array.from({ length: 5 }, () => generateFakeReceita());

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (fakeData) {
      return fakeData;
    }

    return Error("Erro getByIdUsuario ao listar Categorias.");
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro getByIdusuario ao listar Categorias.");
  }
};

const create = async (dados: Omit<IReceitaVM, "id">): Promise<any | Error> => {
  try {
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Generate fake data
    const fakeId: number = faker.datatype.number();

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (fakeId) {
      return fakeId;
    }

    return Error("Erro ao criar novo registro de receita.");
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro ao criar novo registro de receita.");
  }
};

const updateById = async (id: number, dados: IReceitaVM): Promise<IReceitaVM | Error> => {
  try {
    dados.id = id;
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Generate fake data
    const updatedData: IReceitaVM = { ...dados };

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (updatedData) {
      return updatedData;
    }

    return Error("Erro ao atualizar registro de receita.");
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro ao atualizar registro de receita.");
  }
};

const deleteById = async (id: number): Promise<any | Error> => {
  try {
    const accessToken = localStorage.getItem("@dpApiAccess")?.replaceAll('"', '');
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return Boolean(id);
  } catch (error) {
    console.log(error);
    return Error((error as { message: string }).message || "Erro ao deletar registro de receita.");
  }
};

export const ReceitasService = {
  getAll,
  getById,
  getByIdUsuario,
  create,
  updateById,
  deleteById,
};
