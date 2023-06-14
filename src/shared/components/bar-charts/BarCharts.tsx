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
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
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

    }, []);

    return (
        smDown ? (
            <Bar height={"120vw"} options={optionsRight} data={dadosGrafico} />
        ) : (
            <Bar height={"120vw"} options={optionsTop} data={dadosGrafico} />
        )
    );
};




