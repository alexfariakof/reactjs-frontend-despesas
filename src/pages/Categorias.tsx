import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, IconButton } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarraFerramentas } from "../shared/components";
import { LayoutMasterPage } from "../shared/layouts";
import { CategoriasService } from "../shared/services/api";
import { Delete, Edit } from "@mui/icons-material";
import { Categoria } from "../shared/models";
interface State {
  id: number;
  descricao: string;
  idTipoCategoria: number;
}

export const Categorias: React.FC = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const [rows, setRows] = useState<Categoria[]>([]);
  const [values, setValues] = useState<State>({
    id: 0,
    descricao: "",
    idTipoCategoria: 0,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChangeTipoCategoria = (event: SelectChangeEvent) => {
    setValues({ ...values, idTipoCategoria: Number(event.target.value) });
  };

  const handleSave = () => {
    let dados: Categoria;
    dados = {
      id: values.id,
      descricao: values.descricao,
      idTipoCategoria: values.idTipoCategoria,
    };

    if (dados.id === 0) {
      CategoriasService.create(dados)
        .then((result) => {
          if (
            result.message === true &&
            result.categoria !== undefined &&
            result.categoria !== null
          ) {
            alert("Categotia cadastrada com sucesso!");
            handleClear();
            initializeCategorias();
          }
        })
        .catch((error) => {
          alert("Erro ao cadastrar categoria!");
        });
    } else {
      CategoriasService.updateById(dados.id, dados)
        .then((result) => {
          if (
            result.message === true &&
            result.categoria !== undefined &&
            result.categoria !== null
          ) {
            initializeCategorias();
            alert("Categoria atualizada com sucesso!");
          }
        })
        .catch((error) => {
          alert("Erro ao atualizar categoria!");
        });
    }
  };

  const handleEdit = (id: number) => {
    CategoriasService.getById(id).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setValues({
          id: result.id,
          idTipoCategoria: result.idTipoCategoria,
          descricao: result.descricao,
        });
      }
    });
  };

  const handleDelete = (id: number, idTipoCategoria: number) => {
    if (idTipoCategoria !== 0) {
      CategoriasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else if (result === true) {
          handleClear();
          alert("Despesa exluída com sucesso!");
        }
      });
    } else {
      handleClear();
      alert("Está categoria não pode ser exluída!");
    }
  };

  const handleClear = () => {
    setValues({
      ...values,
      id: 0,
      idTipoCategoria: 0,
      descricao: "",
    });
  };

  useEffect(() => {
    initializeCategorias();

    const handleResize = () => {
      setHeight(document.body.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initializeCategorias = (): void => {
    if (values.idTipoCategoria === 0) {
      CategoriasService.getAll().then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result);
        }
      });
    } else {
      CategoriasService.getByTipoCategoria(values.idTipoCategoria).then(
        (result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result);
          }
        }
      );
    }
  };

  return (
    <LayoutMasterPage
      titulo="Categorias"
      height={height}
      barraDeFerramentas={
        <BarraFerramentas
          isOpenTxtBusca={false}
          btnVoltar
          onClickVoltar={() => navigate("/Categorias")}
          btnNovo
          onClickNovo={() => handleClear()}
          btnSalvar
          onClickSalvar={() => handleSave()}
        />
      }
    >
      <Box
        gap={1}
        margin={1}
        padding={1}
        paddingX={2}
        display="flex"
        flexDirection="column"
        alignItems="start"
        component={Paper}
      >
        <FormControl size="small" fullWidth>
          <InputLabel id="txtTipoCategoria">Tipo de Categoria</InputLabel>
          <Select
            labelId="txtTipoCategoria"
            id="txtTipoCategoria"
            value={values.idTipoCategoria.toString()}
            label="Tipo de Categoria"
            onChange={handleChangeTipoCategoria}
            defaultValue="0"
          >
            <MenuItem disabled value={0}>
              Nenhum Tipo de Categoria Selecionada
            </MenuItem>
            <MenuItem value={1}>Despesas</MenuItem>
            <MenuItem value={2}>Receitas</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="descricao"
          size="small"
          label="Descrição"
          inputProps={{ maxLength: 50 }}
          fullWidth
          value={values.descricao}
          onChange={handleChange("descricao")}
        />
      </Box>
      <Box
        gap={1}
        margin={1}
        marginTop={0}
        padding={1}
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        component={Paper}
        overflow="hidden"
      >
        <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Ações</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                (row: {
                  id: number;
                  idTipoCategoria: number;
                  descricao: any;
                }) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <IconButton
                        id="delete"
                        onClick={() =>
                          handleDelete(row.id, row.idTipoCategoria)
                        }
                      >
                        <Delete />
                      </IconButton>
                      <IconButton id="edit" onClick={() => handleEdit(row.id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      {row.idTipoCategoria === 1 ? "Despesas" : "Receitas"}
                    </TableCell>
                    <TableCell>{row.descricao}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LayoutMasterPage>
  );
};
