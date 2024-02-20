import React, { useState } from 'react';

function ReceiptNumberForm({ onUpdateReceiptNumber }) {
  const [receiptNumber, setReceiptNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateReceiptNumber(receiptNumber);
  };

  return (
    <div className="container">
      <h2>Actualizar Número Inicial de Recibos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese el nuevo número de recibo"
          value={receiptNumber}
          onChange={(e) => setReceiptNumber(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default ReceiptNumberForm;
