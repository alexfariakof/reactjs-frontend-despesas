import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Relogio: React.FC  = () => {
    const [time, setTime] = useState<string | null>(null);
    const [semana, setSemana] = useState<string>(dayjs().format('dddd'));
    const [dia, setDia] = useState<string>(dayjs().format('DD'));
    const [mes, setMes] = useState<string>(dayjs().format('MMMM'));
    const [ano, setAno] = useState<string>(dayjs().format('YYYY'));

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
        <div className="relogio" style={{ color: '#333333' }}>
            <div className="data">
                <span className="formatData1">{semana}, </span>
                <span className="formatData2">{dia}</span>
                <span className="formatData1"> de </span>
                <span className="formatData2">{mes}</span>
                <span className="formatData1"> de </span>
                <span className="formatData2">{ano}</span>
                <span className="hora"> // {time}</span>
            </div>
        </div>
    )
}

export default Relogio;