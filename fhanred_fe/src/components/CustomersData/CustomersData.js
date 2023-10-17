import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import './CustomersData.css';

function CustomersData() {
  const clientesData = useSelector((state) => state.clientesData);
  const [clientes, setClientes] = useState(clientesData);
  const [orderBy, setOrderBy] = useState('nombre'); // Columna inicial de ordenamiento
  const [orderAsc, setOrderAsc] = useState(true); // Orden inicial (ascendente)
  const [searchText, setSearchText] = useState('');

  // Función para cambiar el orden de la tabla
  const handleSort = (column) => {
    if (column === orderBy) {
      setOrderAsc(!orderAsc);
    } else {
      setOrderBy(column);
      setOrderAsc(true);
    }
  };

  // Función para buscar clientes por nombre, cédula o plan
  const handleSearch = () => {
    const filteredClientes = clientesData.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        cliente.cedula.includes(searchText) ||
        cliente.plan.toLowerCase().includes(searchText.toLowerCase())
    );
    setClientes(filteredClientes);
  };

  // Función para restaurar la lista completa
  const handleResetSearch = () => {
    setClientes(clientesData);
    setSearchText('');
  };

  // Ordena la lista de clientes según la columna y dirección de ordenamiento
  const sortedClientes = _.orderBy(
    clientes,
    [orderBy],
    [orderAsc ? 'asc' : 'desc']
  );

  return (
    <div className="clients-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar por nombre, cédula o plan"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleResetSearch}>Restaurar búsqueda</button>
      </div>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('cedula')}>
              Cédula
              {orderBy === 'cedula' && (orderAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('nombre')}>
              Nombre
              {orderBy === 'nombre' && (orderAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('apellido')}>
              Apellido
              {orderBy === 'apellido' && (orderAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('fechaNacimiento')}>
              Fecha de Nacimiento
              {orderBy === 'fechaNacimiento' && (orderAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('plan')}>
              Plan Contratado
              {orderBy === 'plan' && (orderAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('ultimoPago')}>
              Último Pago
              {orderBy === 'ultimoPago' && (orderAsc ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClientes.map((cliente) => (
            <tr key={cliente.cedula} className="client-item">
              <td>{cliente.cedula}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.fechaNacimiento}</td>
              <td>{cliente.plan}</td>
              <td>{cliente.ultimoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default CustomersData;
