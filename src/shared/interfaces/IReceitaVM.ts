import { Dayjs } from "dayjs";
import { ICategoriaVM } from "./ICategoriaVM";
export interface IReceitaVM {
  id: number;
  categoria: ICategoriaVM;
  data: Dayjs | null;
  descricao: string;
  valor: number;
}