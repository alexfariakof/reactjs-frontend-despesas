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
import { ReceitasService, CategoriasService } from "../shared/services/api";
import { Categoria, Receita } from "../shared/models";
interface State {
  id: number;
  categoria: Categoria | null;
  data: Dayjs | null;
  descricao: string;
  valor: number;
}

export const Receitas: React.FC = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const { id = 0 } = useParams<"id">();
  const [categorias, setCategorias] = useState<Omit<Categoria, "">[]>([]);
  const [values, setValues] = useState<State>({
    id: 0,
    categoria: null,
    valor: 0,
    descricao: "",
    data: dayjs("2014-08-18T21:11:54"),
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

  const handleSave = () => {
    let dados: Receita;
    dados = {
      id: Number(id),
      categoria: values.categoria as Categoria,
      data: values.data,
      descricao: values.descricao,
      valor: values.valor,
    };

    if (id === 0 && dados.categoria !== null) {
      ReceitasService.create(dados)
        .then((response: Receita | Error) => {
          if (response instanceof Error) {
            alert(response);
          } else {
            if (response !== undefined && response !== null && response) {
              alert("Recetita cadastrada com sucesso!");
              handleClear();
            }
          }
        })
        .catch((error) => {
          alert("Erro ao cadastrar receita!");
        });
    } else if (dados.categoria !== null) {
      ReceitasService.updateById(Number(id), dados)
        .then((response: Receita | Error) => {
          if (response instanceof Error) {
            alert(response);
            return false;
          } else {
            if (response !== undefined && response !== null && response) {
              alert("Recetita atualizada com sucesso!");
              navigate(`/lancamentos`);
            }
          }
        })
        .catch((error) => {
          alert("Erro ao atualizar receita!");
        });
    }
  };

  const handleEdit = (recetita: Receita) => {
    setValues({
      id: recetita.id,
      categoria: recetita.categoria,
      data: recetita.data,
      descricao: recetita.descricao,
      valor: recetita.valor,
    });
  };

  const handleClear = () => {
    setValues({
      ...values,
      id: 0,
      categoria: null,
      data: dayjs("2014-08-18T21:11:54"),
      descricao: "",
      valor: 0,
    });
  };
  useEffect(() => {
    CategoriasService.getByTipoCategoria(2).then((result: any) => {
      setCategorias(result);
    });

    const handleResize = () => {
      setHeight(document.body.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (id !== 0) {
      ReceitasService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return false;
        } else {
          handleEdit(result);
          console.log(result.id);
        }
      });
    }
  }, [id]);

  return (
    <LayoutMasterPage
      titulo="Receitas"
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
        alignItems="stretch"
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
