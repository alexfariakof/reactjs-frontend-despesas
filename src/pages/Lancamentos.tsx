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
    const { debounce } = useDebounce(true);
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

    }, [debounce, rows]);
    
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
                            {Array.isArray(rows) && rows.map(row => (
                                    <TableRow key={Math.floor(Math.random() * 65536)}  >
                                        <TableCell align='center'>
                                            <IconButton onClick={() => handleDelete(row.tipoCategoria, row.idDespesa === 0 ?  row.idReceita : row.idDespesa) }>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEdit(row.tipoCategoria, row.idDespesa === 0 ?  row.idReceita : row.idDespesa)  }>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.data}</TableCell>
                                        <TableCell>{row.tipo }</TableCell>                                        
                                        <TableCell>R$ {row.valor}</TableCell>
                                        <TableCell>{row.descricao}</TableCell>
                                        <TableCell>{row.tipoCategoria}</TableCell>
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
