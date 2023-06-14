import { useState } from 'react';
import { Box, Button, Paper, TextField, useTheme, FormControl } from "@mui/material";
import Stack from '@mui/material/Stack';
import SalvarIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface IBarraFerramentasProps {
    children?: React.ReactNode;
    textBusca?: string;
    isOpenTxtBusca?: boolean;
    isOpenDataMesAno?: boolean;
    handleChangeMesAno?: (value: Dayjs) => void;
    btnSalvar?: boolean;
    btnNovo?: boolean;
    btnVoltar?: boolean;
    btnAtualizar?: boolean;
    onClickSalvar?: () => void;
    onClickNovo?: () => void;
    onClickVoltar?: () => void;
    handleAtualizarLancamento?: (valorMesAno: Dayjs) => void;
    isOpenDataAno?: boolean;
    btnAtualizarGrafico?: boolean;
    handleAtualizarGrafico?: (valorAno: Dayjs) => void;
};

export const BarraFerramentas: React.FC<IBarraFerramentasProps> = ({
    children,
    textBusca = '',
    isOpenTxtBusca = false,
    isOpenDataMesAno = false,
    btnSalvar = true,
    btnNovo = true,
    btnVoltar = true,
    btnAtualizar = false,    
    isOpenDataAno = false,
    btnAtualizarGrafico = false,
    handleAtualizarGrafico,
    handleAtualizarLancamento,
    onClickSalvar,
    onClickNovo,
    onClickVoltar,

}) => {

    const theme = useTheme();
    const [mesAno, setMesAno] = useState<any>(dayjs());
    const [ano, setAno] = useState<any>(dayjs());
    const handleChangeMesAno = (value: any) => {
        setMesAno(value);
    };    
    const handleChangeAno = (value: any) => {
        setAno(value);
    }

    return (
        <Box height={theme.spacing(5)} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper} >
            {isOpenDataMesAno && (
                <FormControl   >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label="Data"
                                value={mesAno}
                                openTo="year"
                                inputFormat="MM/YYYY"
                                onChange={handleChangeMesAno}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
            )}
            {btnAtualizar && (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disableElevation
                    startIcon={<AutorenewIcon />}
                    onClick={() => handleAtualizarLancamento && handleAtualizarLancamento(mesAno)}
                    style={{ width: "auto", height: "2rem" }}
                    sx={{
                        "@media (max-width: 600px)": {
                            width: "100%",
                            height: "3rem",
                        },
                    }}
                    
                ></Button>
            )}
              {isOpenDataAno && (
                <FormControl   >
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} >
                            <DesktopDatePicker
                                label="Ano"
                                value={ano}
                                openTo="year"
                                inputFormat="YYYY"
                                onChange={handleChangeAno}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                </FormControl>
            )}
            {btnAtualizarGrafico && (
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disableElevation
                    startIcon={<AutorenewIcon />}
                    onClick={() => handleAtualizarGrafico && handleAtualizarGrafico(ano)}
                    style={{ width: "auto", height: "2rem" }}
                    sx={{
                        "@media (max-width: 600px)": {
                            width: "100%",
                            height: "3rem",
                        },
                    }}
                ></Button>
            )}
            {isOpenTxtBusca && (
                <TextField size="small" placeholder="Pesquisar" />
            )}
            <Box flex={1} display="flex" justifyContent="end" paddingX={1} gap={1} >
                {btnSalvar && (
                    <Button size="small" variant='contained' color='success' disableElevation startIcon={<SalvarIcon />} onClick={onClickSalvar}  >Salvar</Button>
                )}

                {btnNovo && (
                    <Button size="small" variant='contained' disableElevation startIcon={<AddIcon />} onClick={onClickNovo}  >Novo</Button>
                )}
                {btnVoltar && (
                    <Button size="small" variant='contained' disableElevation startIcon={<ArrowBackIcon />} onClick={onClickVoltar} >Voltar</Button>
                )}
            </Box>
        </Box>
    );
}