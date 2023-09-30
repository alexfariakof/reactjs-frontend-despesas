import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useMediaQuery, Theme } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Dayjs } from 'dayjs';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const optionsTop = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Lançamentos Ano 2023',
    },
  },
};

const optionsRight = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Lançamentos Ano 2023',
    },
  },
};

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const charData: ChartData = {
  labels,
  datasets: [
    {
      label: 'Despesas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Receitas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
  const [dadosGrafico, setDadosGrafico] = useState<any>(charData); // Inicializa com os dados nulos

  useEffect(() => {
    updateDadosGrafico();
  }, [valorAno, smDown]);

  const updateDadosGrafico = () => {
    setBarKey((prevKey) => prevKey + 1);
    setDadosGrafico(charData);

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