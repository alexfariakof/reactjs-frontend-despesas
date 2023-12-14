import { Dayjs } from "dayjs";
import { ICategoriaVM } from "./ICategoriaVM";
export interface IDespesaVM {
  id: number;
  categoria: ICategoriaVM;
  data: Dayjs | null;
  descricao: string;
  valor: number;
  dataVencimento: Dayjs | null;
}