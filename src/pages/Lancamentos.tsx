import { useEffect, useState } from "react";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LayoutMasterPage } from "../shared/layouts";
import { BarraFerramentas } from "../shared/components";
import { LancamentosService, DespesasService, ReceitasService } from "../shared/services/api";
import { useDebounce } from "../shared/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Lancamento } from "../shared/models";

export const Lancamentos = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(true, false);
  const [height, setHeight] = useState(0);
  const [lancamentoMesAno, setLancamentoMesAno] = useState<Dayjs>(dayjs());
  const [rows, setRows] = useState<Omit<Lancamento, "id">[]>([]);
  const handleAtualizarLancamento = (valorMesAno: Dayjs) => {
    setLancamentoMesAno(valorMesAno);
    updateLancamentos();
  };

  useEffect(() => {
    debounce(() =>  updateLancamentos());

    const handleResize = () => {
      setHeight(document.body.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rows]);

  const updateLancamentos = ():void => {
    LancamentosService.getByMesAnoByIdUsuario(lancamentoMesAno).then((response: Lancamento[]) => {
      if (response instanceof Error) {
          alert(response);
        } else {
          setRows(response);
        }
      }
    );
  }

  const handleDelete = (tipoCategoria: string, id: number) => {
    if (tipoCategoria === "Despesa") {
      DespesasService.deleteById(id).then((response: boolean) => {
        if (response) {
          updateLancamentos();
          alert("Despesa exluída com sucesso!");
        }
      });
    } else {
      ReceitasService.deleteById(id).then((response: boolean) => {
        if (response) {
          updateLancamentos();
          alert("Receita exluídas com sucesso!");
        }
      });
    }
  };

  const handleEdit = (tipoCategoria: string, id: number) => {
    if (tipoCategoria === "Despesa") {
      navigate("/despesas/" + id);
    } else {
      navigate("/receitas/" + id);
    }
  };

  return (
    <LayoutMasterPage
      titulo="Lançamentos"
      height={height}
      barraDeFerramentas={
        <BarraFerramentas
          isOpenDataMesAno={true}
          btnAtualizar={true}
          btnVoltar={true}
          handleAtualizarLancamento={handleAtualizarLancamento}
          btnNovo={false}
          btnSalvar={false}
        />
      }
    >
      <Box
        gap={1}
        margin={1}
        height="100%"
        padding={1}
        display="flex"
        flexDirection="row"
        alignItems="start"
        component={Paper}
        style={{ overflow: "auto" }}
      >
        <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width="100vw">
                  Ações
                </TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) &&
                rows.map((row) => (
                  <TableRow key={Math.floor(Math.random() * 65536)}>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          handleDelete(
                            row.tipoCategoria,
                            row.idDespesa === 0 ? row.idReceita : row.idDespesa
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleEdit(
                            row.tipoCategoria,
                            row.idDespesa === 0 ? row.idReceita : row.idDespesa
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.data}</TableCell>
                    <TableCell>{row.tipoCategoria}</TableCell>
                    <TableCell>{row.categoria}</TableCell>
                    <TableCell>{row.descricao}</TableCell>
                    <TableCell>
                      {row.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LayoutMasterPage>
  );
};
