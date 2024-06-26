import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BarraFerramentas } from "../shared/components";
import { LayoutMasterPage } from "../shared/layouts";
import { CategoriasService, DespesasService } from "../shared/services/api";
import { useDebounce } from "../shared/hooks";
import { Categoria, Despesa } from "../shared/models";

interface State {
  id: number;
  categoria: Categoria | undefined | null;
  data: Dayjs | null;
  descricao: string;
  dtVencimento: Dayjs | null;
  valor: number;
}

export const Despesas: React.FC = () => {
  const navigate = useNavigate();
  const { debounce } = useDebounce(true, true);
  const [height, setHeight] = useState(0);
  const { id = 0 } = useParams<"id">();
  const [categorias, setCategorias] = useState<Omit<Categoria, "">[]>([]);
  const [values, setValues] = useState<State>({
    id: 0,
    valor: 0,
    descricao: "",
    categoria: null,
    data: dayjs(),
    dtVencimento: null,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChangeCategoria = (event: SelectChangeEvent) => {
    const categoriaId = event.target.value;
    const categoriaSelecionada = categorias.find(
      (categoria) => categoria.id === Number(categoriaId)
    );

    setValues((prevValues) => ({
      ...prevValues,
      categoria: categoriaSelecionada || null,
    }));
  };

  const handleChangeData = (newValue: Dayjs | null) => {
    setValues({ ...values, data: newValue });
  };

  const handleChangeDataVencimento = (newValue: Dayjs | null) => {
    setValues({ ...values, dtVencimento: newValue });
  };

  const handleSave = () => {
    let dados: Despesa;
    dados = {
      id: Number(id),
      categoria: values.categoria as Categoria,
      data: values.data,
      descricao: values.descricao,
      valor: values.valor,
      dataVencimento: values.dtVencimento,
    };

    if (id === 0 && dados.categoria !== null) {
      DespesasService.create(dados)
        .then((response: Despesa) => {
          if (response instanceof Error) {
            alert(response);
          } else {
            if (response !== undefined && response !== null && response) {
              alert("Despesa cadastrada com sucesso!");
              handleClear();
            }
          }
        })
        .catch((error) => {
          alert("Erro ao cadastrar despesa!");
        });
    } else if (dados.categoria !== null) {
      DespesasService.updateById(Number(id), dados)
        .then((response: Despesa) => {
          if (response instanceof Error) {
            alert(response);
          } else {
            if (response !== undefined && response !== null && response) {
              alert("Despesa atualizada com sucesso!");
              navigate(`/lancamentos`);
            }
          }
        })
        .catch((error) => {
          alert("Erro ao atualizar despesa!");
        });
    }
  };

  
  const handleEdit = async (desp: Despesa | any) => {
    await CategoriasService.getByTipoCategoria(1).then((response: Categoria[]) => {
        setCategorias(response);
        setValues({
          id: desp.id,
          categoria: desp.categoria,
          data: desp.data,
          descricao: desp.descricao,
          dtVencimento: desp.dataVencimento,
          valor: desp.valor,
        });
      }
    );
  };

  const handleClear = () => {
    setValues({
      ...values,
      id: 0,
      categoria: null,
      data: dayjs("2014-08-18T21:11:54"),
      descricao: "",
      dtVencimento: dayjs("2014-08-18T21:11:54"),
      valor: 0,
    });
  };

  useEffect(() => {
    debounce(() => {
      if (id !== 0) {
        DespesasService.getById(Number(id)).then((response: Despesa) => {
          if (response instanceof Error) {
            alert(response);
          } else {
            handleEdit(response);
            console.log(response.id);
          }
        });
      } else {
        CategoriasService.getByTipoCategoria(1).then((response: Categoria[]) => {
          setCategorias(response);
        });
      }
    });

    const handleResize = () => {
      setHeight(document.body.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [debounce, id]);

  return (
    <LayoutMasterPage
      titulo="Despesas"
      height={height}
      barraDeFerramentas={
        <BarraFerramentas
          isOpenTxtBusca={false}
          btnVoltar
          onClickVoltar={() => navigate("/lancamentos")}
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
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="start"
        component={Paper}
      >
        <FormControl size="small" fullWidth>
          <InputLabel id="txtCategoria">Categoria</InputLabel>
          <Select
            labelId="txtCategoria"
            id="txtCategoria"
            value={values.categoria ? values.categoria?.id.toString() : "null"}
            label="Categoria"
            onChange={handleChangeCategoria}
          >
            <MenuItem value={0} disabled>
              <em>Nenhuma Categoria Selecionada</em>
            </MenuItem>
            {Array.isArray(categorias) &&
              categorias.map((categoria) => (
                <MenuItem key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Data"
                inputFormat="DD/MM/YYYY"
                value={values.data}
                onChange={handleChangeData}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </FormControl>
        <TextField
          size="small"
          label="Descrição"
          inputProps={{ maxLength: 50 }}
          fullWidth
          value={values.descricao}
          onChange={handleChange("descricao")}
        />
        <FormControl size="small" fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Data de Vencimento"
                inputFormat="DD/MM/YYYY"
                value={values.dtVencimento}
                onChange={handleChangeDataVencimento}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </FormControl>
        <FormControl size="small" fullWidth variant="outlined">
          <InputLabel htmlFor="txtValor">Valor</InputLabel>
          <OutlinedInput
            id="txtValor"
            value={values.valor}
            onChange={handleChange("valor")}
            startAdornment={
              <InputAdornment position="start">R$</InputAdornment>
            }
            label="Valor"
            type="number"
            inputProps={{ mask: "R$ ###.##0,00" }}
          />
        </FormControl>
      </Box>
    </LayoutMasterPage>
  );
};
