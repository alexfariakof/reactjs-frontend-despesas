export interface Lancamento {
  id: number;
  idDespesa: number;
  idReceita: number;
  data: string;
  tipoCategoria: string;
  categoria: string;
  descricao: string;
  valor: number;
}