import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { LancamentosService } from '../../services/api';
import { useDebounce } from '../../hooks/UseDebounce';

const Saldo: React.FC = () => {
  const { debounce } = useDebounce(false, 120000);
  const [saldo, setSaldo] = useState<number>(0);

  useEffect(() => {
    debounce(() => {
      LancamentosService.getSaldoByIdUsuario()
        .then((result) => {
          setSaldo(result);
        });
    });
  }, []);

  const saldoStyle = {
    color: saldo < 0 ? 'red' : 'green',
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}></TableCell>
          <TableCell style={saldoStyle}>Saldo</TableCell>
          <TableCell style={saldoStyle}>R$ {saldo.toString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default Saldo;
