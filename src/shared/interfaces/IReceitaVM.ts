import { Dayjs } from "dayjs";

export interface IReceitaVM {
  id: number;
  idCategoria: Number;
  data: Dayjs | null;
  descricao: string;
  valor: number;
}