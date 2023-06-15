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
import dayjs, { Dayjs } from 'dayjs';
import { Height } from '@mui/icons-material';

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

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
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
    handleAtualizarGrafico?: (valorMesAno: Dayjs) => void;
    valorAno: Dayjs | null;
}

export const BarCharts: React.FC<IBarChartsProps> = ({ handleAtualizarGrafico, valorAno }) => {
    const { debounce } = useDebounce(false, undefined, true);
    const [chartHeight, setChartHeight] = useState(0);    
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [options, setOptions] = useState(smDown ? optionsRight : optionsTop);
    const [graficoAno, setGraficoAno] = useState<Dayjs | null>(dayjs());
    const [dadosGrafico, setDadosGrafico] = useState<any>(dataNull); // Inicializa com os dados nulos

    useEffect(() => {
        debounce(async () => {
            setGraficoAno(valorAno);
            await LancamentosService.getDadosGraficoByAnoByIdUsuario(graficoAno, Number(localStorage.getItem('idUsuario')))
                .then((result) => {
                    if (result) {
                        // Atualiza os dados do gráfico com os dados obtidos
                        const newData = result;
                        setDadosGrafico(newData);
                    }
                });
        });

        const handleResize = () => {
            if (smDown) {
                setChartHeight(window.innerHeight);
              } else {
                setChartHeight(window.innerHeight * 0.7);
              }            
          };
      
          window.addEventListener('resize', handleResize);
          handleResize(); // Set the chart's height when the component mounts
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };     
    }, [chartHeight]);  

    useEffect(() => {
        debounce(async () => {
            setGraficoAno(valorAno);
            await LancamentosService.getDadosGraficoByAnoByIdUsuario(graficoAno, Number(localStorage.getItem('idUsuario')))
                .then((result) => {
                    if (result) {
                        // Atualiza os dados do gráfico com os dados obtidos
                        const newData = result;
                        setDadosGrafico(newData);
                    }
                });
        });

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
      }, [options]);
    

    return (
        <Box sx={{ height: smDown ? chartHeight : '70vh', width: '100%' }} >
          <Bar options={options}  data={dadosGrafico}/>
        </Box>
      );    
};




