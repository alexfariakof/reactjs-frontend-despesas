import { useTheme, Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { LayoutMasterPage } from '../shared/layouts';
import { BarraFerramentas } from '../shared/components';
import { useEffect, useState } from 'react';
import { LancamentosService, ILancamentoVM, DespesasService, ReceitasService } from '../shared/services/api';
import { useDebounce } from '../shared/hooks';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';


export const Lancamentos = () => {
    const navigate = useNavigate();
    const { debounce } = useDebounce();
    const theme = useTheme();
    const [rows, setRows] = useState<(Omit<ILancamentoVM, 'id'>[])>([]);

    useEffect(() => {
        debounce(() => {
            LancamentosService.getByMesAnoByIdUsuario('2023-05', Number(localStorage.getItem('idUsuario')))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        setRows(result);
                    }
                });
        });

    }, [rows]);

    const handleDelete = (tipoCategoria: string, id: number) => {
        if(tipoCategoria === 'Despesa') {
            DespesasService
                .deleteById(id)
                .then((result) => {
                    if (result === true) {                        
                        alert('Despesa exluída com sucesso!');                        
                    }
                });
        }
        else {
            ReceitasService
                .deleteById(id)
                .then((result) => {
                    if (result === true){
                        navigate('/lancamentos');
                        alert('Receita exluídas com sucesso!');       
                    }
                });            
        }
    };

    const handleEdit = (tipoCategoria: string, id: number) => {
        if(tipoCategoria === 'Despesa') {
            navigate('/despesas/' + id) ;
        }
        else {
            navigate('/receitas/' + id) ;
        }
};

    return (
        <LayoutMasterPage titulo='Lançamentos'
            barraDeFerramentas={(
                <BarraFerramentas isOpenDataMesAno={true}  btnNovo={false} btnSalvar={false} />
            )}
        >

            <Box
                gap={1}
                margin={1}
                padding={1}
                paddingX={2}
                height={theme.spacing}
                display="flex"
                flexDirection="row"
                alignItems="start"
                component={Paper} 
                style={{overflow: 'auto'}}
                >
                <TableContainer component={Paper}  variant="outlined" sx={{ m: 1 }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' width="100vw" >Ações</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Categoria</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow >
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete('Receita', 2)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit('Receita', 2)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>18/08/2023</TableCell>
                                <TableCell>Receitas</TableCell>
                                <TableCell>R$ 8.000,00</TableCell>
                                <TableCell>Salário recebido em Agosto de 2023</TableCell>
                                <TableCell>Salário</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete('Despesa', 1)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit('Despesa', 1)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>06/02/2023</TableCell>
                                <TableCell>Despesas</TableCell>
                                <TableCell>R$ 45,89</TableCell>
                                <TableCell>Almoço no Jirafas</TableCell>
                                <TableCell>Alimentação</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>                         
                                    <IconButton size="small" onClick={() => handleDelete('Despesa', 2)  } >
                                        <DeleteIcon />
                                    </IconButton >
                                    <IconButton size="small" onClick={() => handleEdit('Despesa', 2)  } >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>09/03/2023</TableCell>
                                <TableCell>Despesas</TableCell>
                                <TableCell>R$ 850,89</TableCell>
                                <TableCell>Gastos Avuslsos </TableCell>
                                <TableCell>Outros</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LayoutMasterPage>
    );
}
