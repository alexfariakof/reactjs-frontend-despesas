import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import { Box } from '@mui/material';

type MonthOfYear = {
    [key: string]: string;
 }
const monthOfYear: MonthOfYear= {
    January:'Janeiro', 
    February:'Fevereiro', 
    March:'Março', 
    April:'Abril',
    May:'Maio', 
    June:'Junho',
    July:'Julho',
    August:'Agosto',
    September:'Setembro',
    October:'Outubro',
    November:'Novembro',
    December:'Dezembro'};

type DaysOfWeek = {
   [key: string]: string;
}
      
const daysOfWeek: DaysOfWeek  = {
    Sunday: 'Domingo',
    Monday: 'Segunda-feira',
    Tuesday: 'Terça-feira',
    Wednesday: 'Quarta-feira',
    Thursday: 'Quinta-feira',
    Friday: 'Sexta-feira',
    Saturday: 'Sábado'
};




const Relogio: React.FC  = () => {
    const [time, setTime] = useState<string | null>(null);
    const [semana] = useState<string>(dayjs().format('dddd'));
    const [dia] = useState<string>(dayjs().format('DD'));
    const [mes] = useState<string>(dayjs().format('MMMM'));
    const [ano] = useState<string>(dayjs().format('YYYY'));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                Intl.DateTimeFormat(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }).format()
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Box fontSize="1.5vw"  style={{ color: '#333333'}} >
            <Box >
                <span className="formatData1">{daysOfWeek[semana]}, </span>
                <span className="formatData2">{dia}</span>
                <span className="formatData1"> de </span>
                <span className="formatData2">{monthOfYear[mes]}</span>
                <span className="formatData1"> de </span>
                <span className="formatData2">{ano}</span>
                <span className="hora"> // {time}</span>
            </Box>
        </Box>
    )
}

export default Relogio;