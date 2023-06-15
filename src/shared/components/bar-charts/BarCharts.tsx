import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useMediaQuery, Theme } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Box } from '@mui/system';

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

export const BarCharts: React.FC = () => {
  const [chartHeight, setChartHeight] = useState(0);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const [options, setOptions] = useState(smDown ? optionsRight : optionsTop);
  const [data, setData] = useState<any>(charData);

  useEffect(() => {
      const handleResize = () => {
          if (smDown) {
              setChartHeight(window.innerHeight);
          }
          else {
              setChartHeight(window.innerHeight * 0.7);
          }

      };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [smDown]);

  useEffect(() => {
    const handleOrientationChange = () => {
        if (smDown) {
            setOptions(optionsTop);
            setChartHeight(window.innerHeight);
          } else {
            setOptions(optionsRight);
            setChartHeight(window.innerHeight * 0.7);
          }

    };
    window.addEventListener('orientationchange', handleOrientationChange);


    return () => {
        window.removeEventListener('orientationchange', handleOrientationChange);
      };  
  }, [smDown, options]);

  return (
    <Box sx={{ height: smDown ? chartHeight : '70vh', width: '100%' }}>
      <Bar data={data} options={options} />
    </Box>
  );
};
