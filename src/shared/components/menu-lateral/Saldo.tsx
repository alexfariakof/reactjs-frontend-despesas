import React, { useEffect, useState } from 'react';
import { makeStyles  } from '@mui/styles';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { LancamentosService } from '../../services/api';
import { useDebounce } from '../../hooks/UseDebounce';

const useStyles = makeStyles({
  saldoRed: {
    color: 'red',
  },
  saldoGreen: {
    color: 'green',
  },
});

const Saldo: React.FC = () => {
  const classes = useStyles();
  const { debounce } = useDebounce(true, 30000);
  const [saldo, setSaldo] = useState<number>(0);

    useEffect(() => {
        debounce(() => {
            LancamentosService.getSaldoByIdUsuario()
                .then((result) => {
                    setSaldo(result);

                });
        });

    }, [debounce, saldo]);
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}></TableCell>
          {saldo < 0 ? (
            <>
              <TableCell className={classes.saldoRed}>Saldo</TableCell>
              <TableCell className={classes.saldoRed}>R$ {saldo}</TableCell>
            </>
          ) : (
            <>
              <TableCell className={classes.saldoGreen}>Saldo</TableCell>
              <TableCell className={classes.saldoGreen}>R$ {saldo}</TableCell>
            </>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default Saldo;
