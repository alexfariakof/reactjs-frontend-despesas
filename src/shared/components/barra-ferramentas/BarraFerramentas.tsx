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
    handleChangeMesAno?: (value: Dayjs | null | undefined) => void;
    btnSalvar?: boolean;
    btnNovo?: boolean;
    btnVoltar?: boolean;
    btnAtualizar?: boolean;
    onClickSalvar?: () => void;
    onClickNovo?: () => void;
    onClickVoltar?: () => void;
    handleAtualizarLancamento?: (valorMesAno: Dayjs | null | undefined) => void;
    geTextBuscaValue?: () => any;
    seTextBuscaValue?: (MesAno: any) => void


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
    handleAtualizarLancamento,
    onClickSalvar,
    onClickNovo,
    onClickVoltar,

}) => {

    const theme = useTheme();
    const [mesAno, setMesAno] = useState<Dayjs | null | undefined>(dayjs());
    const handleChangeMesAno = (value: Dayjs | null | undefined) => {
        setMesAno(value);
    };    

    return (
        <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" alignItems="center" gap={1} component={Paper} >
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
                    style={{ width: "auto" }}
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