import { Dayjs } from "dayjs";
import { Categoria } from "./Categoria";
export interface Despesa {
  id: number;
  categoria: Categoria;
  data: Dayjs | null;
  descricao: string;
  valor: number;
  dataVencimento: Dayjs | null;
}