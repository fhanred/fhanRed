import React from 'react';

const IncomeList = ({ ingresos }) => {
  return (
    <div>
      
      <ul>
        {ingresos.map((income, index) => (
          <li key={index}>
            <strong>Recibo:  </strong> {income.receipt}|    
            <strong>Contrato:  </strong> {income.contract}|
            <strong>Dia de pago:  </strong> {income.paymentDate}|
            <strong>Hora de Pago:  </strong> {income.paymentTime}|
            <strong>Usuario  </strong> {income.username}|
            <strong>Municipio  </strong> {income.municipio}|
            <strong>Dirección  </strong> {income.direccion}|
            <strong>Importe:  </strong> {income.importe}|
            <strong>Description:  </strong> {income.description}|
            <strong>Metodo de Pago:  </strong> {income.paymentMethod}
            <strong>Cajero:  </strong> {income.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;