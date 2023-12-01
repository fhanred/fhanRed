import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaSearch, FaUndo } from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './CustomersData.css';

function CustomersData() {
  const clientesData = useSelector((state) => state.usersData);
  const [clientes, setClientes] = useState(clientesData);
  const [orderBy, setOrderBy] = useState('nombre'); // Columna inicial de ordenamiento
  const [orderAsc, setOrderAsc] = useState(true); // Orden inicial (ascendente)
  const [searchText, setSearchText] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userNotFound, setUserNotFound] = useState(false);
  const usersPerPage = 15;

  // Lógica para obtener usuarios mostrados basados en la página actual y la búsqueda
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Función para cambiar el orden de la tabla
  const handleSort = (column) => {
    let newOrderAsc = true;

    if (column === orderBy) {
      newOrderAsc = !orderAsc;
      setOrderAsc(newOrderAsc);
    } else {
      setOrderBy(column);
    }

    // Ordenar los datos basados en la columna y el orden seleccionados
    const sortedData = _.orderBy(
      filteredClientes.length > 0 ? filteredClientes : clientes,
      [column],
      [newOrderAsc ? 'asc' : 'desc']
    );
    setFilteredClientes(sortedData);
  };

  // Función para buscar clientes por nombre, cédula o plan
  const handleSearch = () => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente.name_razonSocial
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        cliente.n_documento.includes(searchText)
    );
    setFilteredClientes(filtered);
    setCurrentPage(1);

    if (filtered.length === 0) {
      // Si no hay resultados, mostrar mensaje de usuario no encontrado
      setUserNotFound(true);
    } else {
      setUserNotFound(false);
    }
  };

  // Función para restaurar la lista completa
  const handleResetSearch = () => {
    setClientes(clientes);
    setSearchText('');
    setFilteredClientes([]);
    setCurrentPage(1);
    setUserNotFound(false);
  };

  // Renderizado de clientes basados en la lógica de búsqueda y paginación
  let renderClientes =
    filteredClientes.length > 0
      ? filteredClientes.slice(indexOfFirstUser, indexOfLastUser)
      : clientes.slice(indexOfFirstUser, indexOfLastUser);

  // Lógica para renderizar los números de página
  const totalUsersCount =
    filteredClientes.length > 0 ? filteredClientes.length : clientes.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsersCount / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="clients">
      <div className="input">
        
        <input
          type="text"
          placeholder="Buscar por nombre, cédula o plan"
          value={searchText}
          className='special-input'
          onChange={(e) => setSearchText(e.target.value)}
        />
        <FaSearch onClick={handleSearch} className="button-clients" />
        <FaUndo onClick={handleResetSearch} className="button-clients" />
      </div>
      {userNotFound && (
        <p className="error-message-clients">
          Usuario no registrado, verifique nuevamente
        </p>
      )}
      <div className="table">
        <table>
          <thead>
            <tr>
              <th
                onClick={() => handleSort('n_documento')}
                className={
                  orderBy === 'n_documento' ? (orderAsc ? 'asc' : 'desc') : ''
                }
              >
                Cédula
                {orderBy === 'n_documento' && (
                  <span>
                    {orderAsc ? (
                      <span className="asc">
                        <FaArrowAltCircleUp className="asc-icon" /> - Ascendente{' '}
                      </span>
                    ) : (
                      <span className="desc">
                        <FaArrowAltCircleDown className="desc-icon" /> -
                        Descendente{' '}
                      </span>
                    )}
                  </span>
                )}
              </th>

              <th
                onClick={() => handleSort('name_razonSocial')}
                className={
                  orderBy === 'name_razonSocial'
                    ? orderAsc
                      ? 'asc'
                      : 'desc'
                    : ''
                }
              >
                Nombre y Apellidos / Razon social
                {orderBy === 'name_razonSocial' && (
                  <span>
                    {orderAsc ? (
                      <span className="asc">
                        <FaArrowAltCircleUp className="asc-icon" /> - Ascendente{' '}
                      </span>
                    ) : (
                      <span className="desc">
                        <FaArrowAltCircleDown className="desc-icon" /> -
                        Descendente{' '}
                      </span>
                    )}
                  </span>
                )}
              </th>

              <th
                onClick={() => handleSort('contrato')}
                className={
                  orderBy === 'contrato' ? (orderAsc ? 'asc' : 'desc') : ''
                }
              >
                # Contrato
                {orderBy === 'contrato' && (
                  <span>
                    {orderAsc ? (
                      <span className="asc">
                        <FaArrowAltCircleUp className="asc-icon" /> - Ascendente{' '}
                      </span>
                    ) : (
                      <span className="desc">
                        <FaArrowAltCircleDown className="desc-icon" /> -
                        Descendente{' '}
                      </span>
                    )}
                  </span>
                )}
              </th>
              <th
                onClick={() => handleSort('plan')}
                className={
                  orderBy === 'plan' ? (orderAsc ? 'asc' : 'desc') : ''
                }
              >
                Plan Contratado
                {orderBy === 'plan' && (
                  <span>
                    {orderAsc ? (
                      <span className="asc">
                        <FaArrowAltCircleUp className="asc-icon" /> - Ascendente{' '}
                      </span>
                    ) : (
                      <span className="desc">
                        <FaArrowAltCircleDown className="desc-icon" /> -
                        Descendente{' '}
                      </span>
                    )}
                  </span>
                )}
              </th>
              <th
                onClick={() => handleSort('ultimoPago')}
                className={
                  orderBy === 'ultimoPago' ? (orderAsc ? 'asc' : 'desc') : ''
                }
              >
                Último Pago
                {orderBy === 'ultimoPago' && (
                  <span>
                    {orderAsc ? (
                      <span className="asc">
                        <FaArrowAltCircleUp className="asc-icon" /> - Ascendente{' '}
                      </span>
                    ) : (
                      <span className="desc">
                        <FaArrowAltCircleDown className="desc-icon" /> -
                        Descendente{' '}
                      </span>
                    )}
                  </span>
                )}
              </th>
              <th>Estado cliente</th>
            </tr>
          </thead>
          <tbody>
            {renderClientes.map((cliente) => (
              <tr key={cliente.n_documento}>
                <td>{cliente.n_documento}</td>
                <td>{cliente.name_razonSocial}</td>
                <td>
                  {/* Envuelve el valor de n_contrato en un Link */}
                  <Link to={`/ruta/nuevo-componente/${cliente.n_contrato}`}>
                    {cliente.n_contrato}
                  </Link>
                </td>
                <td></td>
                <td></td>
                <td>{cliente.active ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`paginate ${currentPage === 1 ? 'active' : ''}`}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronLeft style={{ width: '20px', height: '20px' }} />
            </span>
          </button>
          {pageNumbers
            .slice(currentPage - 1, currentPage + 15)
            .map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`paginate ${currentPage === number ? 'active' : ''}`}
              >
                <span className="page-number">{number}</span>
              </button>
            ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`paginate ${
              currentPage === pageNumbers.length ? 'active' : ''
            }`}
          >
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronRight style={{ width: '20px', height: '20px' }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomersData;
