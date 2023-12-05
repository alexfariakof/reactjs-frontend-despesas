import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { LancamentosService } from "../../services/api";

const Saldo: React.FC = () => {
  const [saldo, setSaldo] = useState<number>(0);

  useEffect(() => {
    LancamentosService.getSaldoByIdUsuario().then((result: any) => {
      if (result.message === true) setSaldo(result.saldo);
    });
  }, []);

  const saldoStyle = {
    color: saldo < 0 ? "red" : "green",
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}></TableCell>
          <TableCell style={saldoStyle}>Saldo</TableCell>
          <TableCell style={saldoStyle}>
            {saldo.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Saldo;
