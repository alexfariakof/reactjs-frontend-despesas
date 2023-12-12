import { Dayjs } from "dayjs";

export interface IDespesaVM {
  id: number;
  idCategoria: number;
  data: Dayjs | null;
  descricao: string;
  valor: number;
  dataVencimento: Dayjs | null;
}