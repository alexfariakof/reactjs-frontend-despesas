import { Dayjs } from "dayjs";
import { Categoria } from "./Categoria";
export interface Receita {
  id: number;
  categoria: Categoria;
  data: Dayjs | null;
  descricao: string;
  valor: number;
}