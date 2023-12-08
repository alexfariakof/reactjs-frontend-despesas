import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LayoutMasterPage } from "../shared/layouts";
import { BarraFerramentas } from "../shared/components";
import {
  LancamentosService,
  DespesasService,
  ReceitasService,
} from "../shared/services/api";
import { useDebounce } from "../shared/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { ILancamentoVM } from "../shared/interfaces";

export const Lancamentos = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(true, false);
  const [height, setHeight] = useState(0);
  const [lancamentoMesAno, setLancamentoMesAno] = useState<Dayjs>(dayjs());
  const [rows, setRows] = useState<Omit<ILancamentoVM, "id">[]>([]);
  const handleAtualizarLancamento = (valorMesAno: Dayjs) => {
    setLancamentoMesAno(valorMesAno);
    LancamentosService.getByMesAnoByIdUsuario(valorMesAno).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setRows(result.lancamentos);
      }
    });
  };

  useEffect(() => {
    debounce(() =>
      LancamentosService.getByMesAnoByIdUsuario(lancamentoMesAno).then(
        (result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.lancamentos);
          }
        }
      )
    );

    const handleResize = () => {
      setHeight(document.body.clientHeight); // Define a altura 0.8 da altura da janela
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Define a altura ao montar o componente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debounce, lancamentoMesAno, rows]);

  const handleDelete = (tipoCategoria: string, id: number) => {
    if (tipoCategoria === "Despesa") {
      DespesasService.deleteById(id).then((result) => {
        if (result === true) {
          alert("Despesa exluída com sucesso!");
        }
      });
    } else {
      ReceitasService.deleteById(id).then((result) => {
        if (result === true) {
          navigate("/lancamentos");
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
