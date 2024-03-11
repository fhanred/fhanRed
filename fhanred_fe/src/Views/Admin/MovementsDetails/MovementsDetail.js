import React, {  useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import "./MovementsDetail.css";
import { fetchMovementsByCashier } from "../../../Redux/Actions/actions";

const MovementsDetail = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.authentication.user.razon_social);
  const movements = useSelector((state) => state.data);


  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado:", userName);
      dispatch(fetchMovementsByCashier(userName));
    }
  }, [isAuthenticated, userName, dispatch]);

  useEffect(() => {
    console.log("Movements:", movements);
  }, [movements]);

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];

  const filteredMovements = movements.filter(movement => movement.paymentDate );

  const sumByPaymentMethod = filteredMovements.reduce((acc, movement) => {
    acc[movement.paymentMethod] = (acc[movement.paymentMethod] || 0) + movement.importe;
    return acc;
  }, {});

  
  return (
    <div className="container">
      <div>
        <Typography variant="h6">Detalles de Movimientos del Cajero</Typography>
        <Typography variant="body1">Fecha: {formattedDate}</Typography>
      </div>
      
      {filteredMovements.length > 0 ? (
        <>
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número de Recibo</TableCell>
                    <TableCell>Fecha de Pago</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Importe</TableCell>
                    <TableCell>Contrato</TableCell>
                    <TableCell>Método de Pago</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMovements.map((movement) => (
                    <TableRow key={movement.receipt}>
                      <TableCell>{movement.receipt}</TableCell>
                      <TableCell>{movement.paymentDate}</TableCell>
                      <TableCell>{movement.username}</TableCell>
                      <TableCell>{movement.importe}</TableCell>
                      <TableCell>{movement.contract}</TableCell>
                      <TableCell>{movement.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <Typography variant="body1">Total por tipo de pago:</Typography>
            <ul>
              {Object.keys(sumByPaymentMethod).map(paymentMethod => (
                <li key={paymentMethod}>
                  {paymentMethod}: {sumByPaymentMethod[paymentMethod]}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Typography variant="body1">No hay movimientos disponibles para hoy.</Typography>
      )}
      
    </div>
  );
}

export default MovementsDetail;























