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
import { useMediaQuery, Theme } from '@mui/material';
import { LancamentosService } from '../../services/api/LancamentosService';
import { useDebounce } from '../../hooks/UseDebounce';
import dayjs, { Dayjs } from 'dayjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const optionsTop = {
    responsive: true,
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


export const optionsRight = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
            label: 'Receitas',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    const [graficoAno, setGraficoAno] = useState<Dayjs | null>(dayjs());
    const [dadosGrafico, setDadosGrafico] = useState<any>(dataNull); // Inicializa com os dados nulos

    useEffect(() => {
        const handleResize = () => {
            setChartHeight(window.innerHeight * 0.8); // Define a altura do gráfico como 80% da altura da janela
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Define a altura do gráfico ao montar o componente

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

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        smDown ? (
            <Bar height={chartHeight} options={optionsRight} data={dadosGrafico} />
        ) : (
            <Bar height={chartHeight} options={optionsTop} data={dadosGrafico} />
        )
    );
};




