import { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, IconButton } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarraFerramentas } from '../shared/components';
import { LayoutMasterPage } from "../shared/layouts";
import { CategoriasService, ICategoriaVM } from '../shared/services/api';
import { Delete, Edit } from '@mui/icons-material';
import { useDebounce } from '../shared/hooks';

interface State {
  id: number;
  descricao: string;
  idUsuario: number;
  idTipoCategoria: number;
}

export const Categorias: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce();
  const [height, setHeight] = useState(0);    
  const [rows, setRows] = useState<ICategoriaVM[]>([]);
  const [values, setValues] = useState<State>({
    id: 0,
    descricao: '',
    idUsuario: 0,
    idTipoCategoria: 0
  });
  
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeTipoCategoria = (event: SelectChangeEvent) => {
    setValues({ ...values, idTipoCategoria: Number(event.target.value) });
  };

  const handleSave = () => {
    let dados: ICategoriaVM;
    dados = {
      id: values.id,
      descricao: values.descricao,
      idUsuario: Number(localStorage.getItem('idUsuario')),
      idTipoCategoria: values.idTipoCategoria
    };

    if (dados.id === 0) {
      CategoriasService
        .create(dados)
        .then((result) => {
          if (result.message === true) {
            alert('Despesa cadastrada com sucesso!');
            handleClear();
          }
        });
    } else {
      CategoriasService
        .updateById(dados.id, dados)
        .then((result) => {
          if (result.message === true) {
            alert('Despesa atualizada com sucesso!');
          }
        });
    }
  }

  const handleEdit = (id: number) => {
    CategoriasService.getById(id)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        }
        else {
          setValues({
            idUsuario: result.idUsuario,
            id: result.id,
            idTipoCategoria: result.idTipoCategoria,
            descricao: result.descricao

          });
        }
      })
  };

  const handleDelete = (id: number, idTipoCategoria: number) => {
    if (idTipoCategoria !== 0) {
      CategoriasService
        .deleteById(id)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          }
          else if (result === true) {
            handleClear();
            alert('Despesa exluída com sucesso!');
          }
        });
    }
    else {
      handleClear();
      alert('Está categoria não pode ser exluída!');
    }
  };

  const handleClear = () => {
    setValues({
      ...values,
      id: 0,
      idTipoCategoria: 0,
      descricao: '',
    });
  }

  useEffect(() => {
    if (values.idTipoCategoria === 0) {
      CategoriasService.getByIdUsuario(Number(localStorage.getItem('idUsuario')))
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          }
          else {
            setRows(result);
          }
        });
    }
    else {
      CategoriasService.getByTipoCategoria(Number(localStorage.getItem('idUsuario')), values.idTipoCategoria)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          }
          else {
            setRows(result);
          }
        });
    }

    const handleResize = () => {
      setHeight(window.innerHeight * 0.8); // Define a altura 0.8 da altura da janela
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Define a altura ao montar o componente

  return () => {
      window.removeEventListener('resize', handleResize);
  };

  }, [values.idTipoCategoria]);

  return (
    <LayoutMasterPage
      titulo='Categorias'
      barraDeFerramentas={(
        <BarraFerramentas
          isOpenTxtBusca={false}
          btnVoltar onClickVoltar={() => navigate('/Categorias')}
          btnNovo onClickNovo={() => handleClear()}
          btnSalvar onClickSalvar={() => handleSave()} />
      )}
      height={height}
    >
      <Box
        gap={1}
        margin={1}
        padding={1}
        paddingX={2}
        display="flex"
        flexDirection="column"
        alignItems="start"
        component={Paper}>
        <FormControl size="small" fullWidth>
          <InputLabel id="txtTipoCategoria">Tipo de Categoria</InputLabel>
          <Select
            labelId="txtTipoCategoria"
            id="txtTipoCategoria"
            value={values.idTipoCategoria.toString()}
            label="Tipo de Categoria"
            onChange={handleChangeTipoCategoria}
            defaultValue='0'
          >
            <MenuItem value={0}>Nenhum Tipo de Categoria Selecionada</MenuItem>
            <MenuItem value={1}>Despesas</MenuItem>
            <MenuItem value={2}>Receitas</MenuItem>
          </Select>
        </FormControl>
        <TextField size="small" label="Descrição" inputProps={{ maxLength: 50 }} fullWidth
          value={values.descricao}
          onChange={handleChange('descricao')}
        />
      </Box>
      <Box
        gap={1}
        margin={1}
        marginTop={0}
        padding={1}
        paddingX={2}
        paddingBottom={0}        
        width='auto'
        display="flex"
        flexDirection="row"
        alignItems="start"
        component={Paper}
        style={{ overflow: 'auto' }}
              >        
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Ações</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  <TableRow key="2">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(2, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(2)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Alimentação</TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(3, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(3)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Casa</TableCell>
                  </TableRow>
                  <TableRow key="4">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(4, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(4)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Serviços</TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(5, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(5)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Saúde</TableCell>
                  </TableRow>
                  <TableRow key="6">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(6, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(6)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Imposto</TableCell>
                  </TableRow>
                  <TableRow key="7">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(7, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(7)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Transporte</TableCell>
                  </TableRow>
                  <TableRow key="8">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(8, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(8)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Lazer</TableCell>
                  </TableRow>
                  <TableRow key="9">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(9, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(9)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Serviços</TableCell>
                  </TableRow>
                  <TableRow key="10">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(10, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(10)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Despesas</TableCell>
                    <TableCell>Outros</TableCell>
                  </TableRow>
                  <TableRow key="11">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(11, 1)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(11)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Receitas</TableCell>
                    <TableCell>Salário</TableCell>
                  </TableRow>
                  <TableRow key="12">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(12, 2)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(12)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Receitas</TableCell>
                    <TableCell>Prêmio</TableCell>
                  </TableRow>
                  <TableRow key="13">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(13, 2)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(13)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Receitas</TableCell>
                    <TableCell>Investimento</TableCell>
                  </TableRow>
                  <TableRow key="14">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(14, 2)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(14)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Receitas</TableCell>
                    <TableCell>Benefício</TableCell>
                  </TableRow>
                  <TableRow key="15">
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(15, 2)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(2)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>Receitas</TableCell>
                    <TableCell>Outros</TableCell>
                  </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LayoutMasterPage>
  );
}