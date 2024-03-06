import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MovementsDetail.css";
import { fetchMovementsByCashier } from "../../../Redux/Actions/actions";

const MovementsDetail = () => {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userName = useSelector((state) => state.authentication.user.razon_social);
  const dispatch = useDispatch();
  const movements = useSelector((state) => state.movements.movementsByCashier);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado:", userName);
      dispatch(fetchMovementsByCashier(userName));
    }
  }, [isAuthenticated, userName, dispatch]);

  useEffect(() => {
    console.log("Movements:", movements);
  }, [movements]);
 
  return (
    <div className="container">
      <h3>Detalles de Movimientos del Cajero</h3>
      <div className="date-selection">
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      <ul>
        {movements.map((movement, index) => (
          <li key={index}>
            <p>Número de Recibo: {movement.receipt}</p>
            <p>Fecha de Pago: {movement.paymentDate}</p>
            <p>Usuario: {movement.username}</p>
            <p>Importe: {movement.importe}</p>
            <p>Contrato: {movement.contract}</p>
            <p>Metodo de Pago: {movement.paymentMethod}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovementsDetail;




