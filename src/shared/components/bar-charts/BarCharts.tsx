import React from 'react';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMediaQuery, Theme, Box } from '@mui/material';
import { LancamentosService } from '../../services/api/LancamentosService';
import { useDebounce } from '../../hooks/UseDebounce';
import { Dayjs } from 'dayjs';

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

export const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const dataNull = {
  labels,
  datasets: [
    {
      label: 'Despesas',
      data: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Receitas',
      data: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};
interface IBarChartsProps {
  valorAno: Dayjs | null;
}

export const BarCharts: React.FC<IBarChartsProps> = ({ valorAno }) => {
  const [chartHeight, setChartHeight] = useState(0);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const orientation =  window.matchMedia("(orientation: portrait)").matches;
  const [options, setOptions] = useState({});
  const [graficoAno, setGraficoAno] = useState(valorAno);
  const [dadosGrafico, setDadosGrafico] = useState<any>(dataNull); // Inicializa com os dados nulos

  useEffect(() => {
    setGraficoAno(valorAno);
    LancamentosService.getDadosGraficoByAnoByIdUsuario(valorAno, Number(localStorage.getItem('idUsuario')))
      .then((result) => {
        if (result) {
          // Atualiza os dados do gráfico com os dados obtidos
          const newData = result;
          setDadosGrafico(newData);
        }
      });
  }, [valorAno]);


   useEffect(() => {
    setGraficoAno(valorAno);
    const fetchData = async () => {      
      const result = await LancamentosService.getDadosGraficoByAnoByIdUsuario(graficoAno, Number(localStorage.getItem('idUsuario')));
      if (result) {
        // Atualiza os dados do gráfico com os dados obtidos
        const newData = result;
        setDadosGrafico(newData);
      }
    };    
    
    const handleResize = () => {
      if (smDown) {
        setChartHeight(window.innerHeight);
      } else {
        setChartHeight(window.innerHeight * 0.7);
      }
    };

    handleResize(); // Set the chart's height when the component mounts
    fetchData();


    return () => {
       window.removeEventListener('resize', handleResize);
    };
  }, [chartHeight]);


  return (
    <>
      {(() => {
        if (orientation && smDown) {
          return <Bar height={chartHeight} options={optionsRight} data={dadosGrafico} />;
        }
        else if (!orientation && smDown) {
          return <Bar height={chartHeight} options={optionsTop} data={dadosGrafico} />;
        }
        else if (!orientation && !smDown) {
          return <Bar height={chartHeight} options={optionsTop} data={dadosGrafico} />;
        }
        else {
          return <Bar height={chartHeight} options={optionsTop} data={dadosGrafico} />;
        }
      })()}
    </>
  );

};




