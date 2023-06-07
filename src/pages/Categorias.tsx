import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, IconButton } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { BarraFerramentas } from '../shared/components';
import { LayoutMasterPage } from "../shared/layouts";
import { CategoriasService, ICategoriaVM } from '../shared/services/api';
import { Delete, Edit, Height } from '@mui/icons-material';
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
  const [rows, setRows] = useState<ICategoriaVM[]>([]);
  const [values, setValues] = useState<State>({
    id: 0,
    descricao: '',
    idUsuario: 0,
    idTipoCategoria: 0
  });
  const tableRef = useRef<HTMLDivElement>(null);
  const [remainingHeight, setRemainingHeight] = useState(0);

  useEffect(() => {
    const calculateRemainingHeight = () => {
      const parentElement = tableRef.current?.parentNode as HTMLDivElement | null;
      if (parentElement) {
        const parentHeight = parentElement.clientHeight;
        const tableHeight = tableRef.current?.clientHeight || 0;
        const heightDifference = parentHeight - tableHeight;
        setRemainingHeight(heightDifference);
      }
    };

    calculateRemainingHeight(); // Calculate the remaining height when the component mounts

    const handleResize = () => {
      calculateRemainingHeight(); // Recalculate the remaining height when the window is resized
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

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
    debounce(() => {
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
    });
  }, [values.idTipoCategoria]);

  return (
    <LayoutMasterPage
      titulo='Categorias'
      barraDeFerramentas={(
        <BarraFerramentas
          isOpenTxtBusca={true}
          btnVoltar onClickVoltar={() => navigate('/Categorias')}
          btnNovo onClickNovo={() => handleClear()}
          btnSalvar onClickSalvar={() => handleSave()} />
      )}
    >
      <Box
        ref={tableRef}
        gap={1}
        margin={1}
        padding={1}
        paddingX={2}
        height="auto"
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
        marginY={0}
        padding={1}
        paddingX={2}
        paddingBottom={0}        
        width='96%'
        height={remainingHeight}
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
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align='center'>
                      <IconButton onClick={() => handleDelete(row.id, row.idTipoCategoria)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(row.id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.idTipoCategoria === 1 ? 'Despesas' : 'Receitas'}</TableCell>
                    <TableCell>{row.descricao}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LayoutMasterPage>
  );
}
