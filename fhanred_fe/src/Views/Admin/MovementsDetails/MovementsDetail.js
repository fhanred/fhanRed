import React, {  useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import "./MovementsDetail.css";
import { fetchMovementsByCashier } from "../../../Redux/Actions/actions";
import { useHistory } from "react-router-dom";

const MovementsDetail = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.authentication.user.razon_social);
  const movements = useSelector((state) => state.data);
  const history = useHistory();

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


  const filteredMovements = movements ? movements.filter(movement => movement.paymentDate === formattedDate) : [];

  const sumByPaymentMethod = filteredMovements.reduce((acc, movement) => {
    acc[movement.paymentMethod] = (acc[movement.paymentMethod] || 0) + movement.importe;
    return acc;
  }, {});

  
  return (
    <div className="container" >
      <div className="header">
        <Typography variant="h6">Detalles de Movimientos del Cajero</Typography>
        <Typography variant="body1">Fecha: {formattedDate}</Typography>
      </div>
      <div className="content">
      {filteredMovements.length > 0 ? (
        <>
          <div  >
            <TableContainer  component={Paper} className="table-container">
              <Table>
                <TableHead >
                  <TableRow >
                    <TableCell className="table-header-cell" >Número de Recibo</TableCell>
                    <TableCell className="table-header-cell" >Fecha de Pago</TableCell>
                    <TableCell className="table-header-cell">Usuario</TableCell>
                    <TableCell className="table-header-cell">Importe</TableCell>
                    <TableCell className="table-header-cell">Contrato</TableCell>
                    <TableCell className="table-header-cell">Método de Pago</TableCell>
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
          <div className="summary">
            <Typography variant="body1">Total por tipo de pago:</Typography>
            <ul>
              {Object.keys(sumByPaymentMethod).map(paymentMethod => (
                <li key={paymentMethod}>
                  {paymentMethod}: {sumByPaymentMethod[paymentMethod]}
                </li>
              ))}
            </ul>
            <button style={{ marginTop: 10}}  type="button" onClick={() => history.push("/caja")}>Volver</button>
          </div>
        </>
      ) : (
        <Typography variant="body1">No hay movimientos disponibles para hoy.</Typography>
      )}
      </div>
    </div>
  );
}

export default MovementsDetail;























