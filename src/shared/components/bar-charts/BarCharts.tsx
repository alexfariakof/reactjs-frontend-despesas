import React from "react";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, ChartProps } from "react-chartjs-2";
import { useMediaQuery, Theme } from "@mui/material";
import { LancamentosService } from "../../services/api/LancamentosService";
import { Dayjs } from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const optionsTop = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Lançamentos Ano 2023",
    },
  },
};

const optionsRight = {
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Lançamentos Ano 2023",
    },
  },
};

export const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
export const dataNull = {
  labels,
  datasets: [
    {
      label: "Despesas",
      data: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Receitas",
      data: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
interface IBarChartsProps {
  valorAno: Dayjs | null;
  height: any;
}

export const BarCharts: React.FC<IBarChartsProps> = ({ valorAno, height }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [barKey, setBarKey] = useState(0);
  const [orientation, setOrientation] = useState<any>(window.matchMedia("(orientation: portrait)").matches);
  const [graficoAno, setGraficoAno] = useState(valorAno);
  const [dadosGrafico, setDadosGrafico] = useState<any>(dataNull); // Inicializa com os dados nulos

  useEffect(() => {
    setGraficoAno(valorAno);
    updateDadosGrafico();
  }, [valorAno, smDown]);

  const updateDadosGrafico = () => {
    const fetchData = async () => {
      const result = await LancamentosService.getDadosGraficoByAnoByIdUsuario(
        graficoAno,
        Number(localStorage.getItem("idUsuario"))
      );
      if (result) {
        // Atualiza os dados do gráfico com os dados obtidos
        const newData = result;
        setBarKey((prevKey) => prevKey + 1);
        setDadosGrafico(newData);
      }
    };
    fetchData();

  };

  return (
    <>
      {(() => {
        if (orientation && smDown) {
          return (
            <Bar key={barKey} height={height} options={optionsRight} data={dadosGrafico} />
          );
        } else if (!orientation && smDown) {
          return (
            <Bar key={barKey} height={height} options={optionsRight} data={dadosGrafico} />
          );
        } else if (!orientation && !smDown) {
          return (
            <Bar key={barKey} height={height} options={optionsTop} data={dadosGrafico} />
          );
        } else {
          return (
            <Bar key={barKey} height={height} options={optionsTop} data={dadosGrafico} />
          );
        }
      })()}
    </>
  );
};