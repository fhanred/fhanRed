import React, { useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaUndo,
} from 'react-icons/fa';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import '../../global.css'
import '../ClientDetail/client.css'
import {Button, ButtonGroup} from '@mui/material';

export default function ClientDetail() {
  const clientesData = useSelector((state) => state.usersData);
  const [clientes, setClientes] = useState(clientesData);
  const [orderBy, setOrderBy] = useState('n_documento');
  const [orderAsc, setOrderAsc] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userNotFound, setUserNotFound] = useState(false);
  const usersPerPage = 15;

  const handleSort = (column) => {
    let newOrderAsc = true;
    if (column === orderBy) {
      newOrderAsc = !orderAsc;
      setOrderAsc(newOrderAsc);
    } else {
      setOrderBy(column);
    }
    const sortedData = _.orderBy(
      filteredClientes.length > 0 ? filteredClientes : clientes,
      [column],
      [newOrderAsc ? 'asc' : 'desc']
    );
    setFilteredClientes(sortedData);
  };

  const handleSearch = () => {
    const filteredExactMatch = clientes.filter((cliente) => {
      // Verifica si hay alguna coincidencia exacta en id_Contract
      const contractMatches = cliente.Contracts && cliente.Contracts.find(contract => contract.id_Contract === parseInt(searchText));
  
      // Si hay coincidencia exacta en id_Contract, devuelve true y se incluye el cliente en los resultados filtrados
      return contractMatches;
    });
  
    const filtered = clientes.filter((cliente) => {
      // Verifica si hay alguna coincidencia exacta en id_Contract
      const contractMatches = cliente.Contracts && cliente.Contracts.find(contract => contract.id_Contract === parseInt(searchText));
  
      // Si hay coincidencia exacta en id_Contract, ya se ha incluido en los resultados filtrados, por lo que se excluye aquí
      if (contractMatches) {
        return false;
      }
  
      // Si no hay coincidencia en id_Contract, se realiza la búsqueda en otros campos
      return (
        cliente.name_razonSocial.toLowerCase().includes(searchText.toLowerCase()) ||
        cliente.n_documento.includes(searchText) ||
        (cliente.Contracts && cliente.Contracts[0] &&
          (cliente.Contracts[0].name_plan.toLowerCase().includes(searchText.toLowerCase()) ||
          cliente.Contracts[0].estado_contrato.toLowerCase().includes(searchText.toLowerCase())))
      );
    });
  
    const filteredResults = [...filteredExactMatch, ...filtered];
  
    setFilteredClientes(filteredResults);
    setCurrentPage(1);
    setUserNotFound(filteredResults.length === 0);
  };
  
  
  
  
  
  
  
  
  

  const handleResetSearch = () => {
    setClientes(clientesData);
    setSearchText('');
    setFilteredClientes([]);
    setCurrentPage(1);
    setUserNotFound(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  let renderClientes =
    filteredClientes.length > 0
      ? filteredClientes.slice(indexOfFirstUser, indexOfLastUser)
      : clientes.slice(indexOfFirstUser, indexOfLastUser);

  const totalUsersCount =
    filteredClientes.length > 0 ? filteredClientes.length : clientes.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsersCount / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="client-detail-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por usuario, cédula, estado contrato"
          value={searchText}
          className="search-input"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ButtonGroup>
          <Button style={{margin: '10px'}} onClick={handleSearch}>Buscar</Button>
          <Button style={{margin: '10px'}} onClick={handleResetSearch}><FaUndo/></Button> 
          <Link to="/homePage">
            <Button style={{margin: '10px'}}>Volver</Button>
          </Link>
        </ButtonGroup>
      </div>
      {userNotFound && (
        <p className="error">Usuario no registrado, verifique nuevamente</p>
      )}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr className='th-table-title'>
              <th onClick={() => handleSort('n_documento')} className={orderBy === 'n_documento' ? (orderAsc ? 'asc' : 'desc') : ''}>
                Cédula
                {orderBy === 'n_documento' && (
                  <span>{orderAsc ? (<span className="asc"><FaArrowAltCircleUp className="asc-icon" /> - Ascendente </span>) : (<span className="desc"><FaArrowAltCircleDown className="desc-icon" /> - Descendente </span>)}</span>
                )}
              </th>
              <th onClick={() => handleSort('name_razonSocial')} className={orderBy === 'name_razonSocial' ? (orderAsc ? 'asc' : 'desc') : ''}>
                Nombre y Apellidos / Razon social
                {orderBy === 'name_razonSocial' && (
                  <span>{orderAsc ? (<span className="asc"><FaArrowAltCircleUp className="asc-icon" /> - Ascendente </span>) : (<span className="desc"><FaArrowAltCircleDown className="desc-icon" /> - Descendente </span>)}</span>
                )}
              </th>
              <th># Contrato</th>
              <th>Plan Contratado</th>
              <th>Último Pago</th>
              <th>Estado contrato</th>
            </tr>
          </thead>
          <tbody>
            {renderClientes.map((cliente) => (
              <tr key={cliente.n_documento}>
                <td>{cliente.n_documento}</td>
                <td>{cliente.name_razonSocial}</td>
                <td>
                  {cliente.Contracts && cliente.Contracts.length > 0 ? (
                    cliente.Contracts.length === 1 ? (
                      <Link to={`/ruta/nuevo-componente/${cliente.Contracts[0].id_Contract}`}>{cliente.Contracts[0].id_Contract}</Link>
                    ) : (
                      <ul>
                        {cliente.Contracts.map((contract, index) => (
                          <li key={`${contract.id_Contract}-${index}`}>
                            <Link to={`/ruta/nuevo-componente/${contract.id_Contract}`}>{contract.id_Contract}</Link>
                          </li>
                        ))}
                      </ul>
                    )
                  ) : (
                    'Sin contrato'
                  )}
                </td>
                <td>
                  {cliente.Contracts && cliente.Contracts.length > 0 ? (
                    cliente.Contracts.length === 1 ? (
                      cliente.Contracts[0].name_plan
                    ) : (
                      <ul>
                        {cliente.Contracts.map((contract, index) => (
                          <li key={`${contract.name_plan}-${index}`}>{contract.name_plan}</li>
                        ))}
                      </ul>
                    )
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {cliente.Contracts && cliente.Contracts.length > 0 ? (
                    cliente.Contracts.length === 1 ? (
                      cliente.Contracts[0].ultimo_pago
                    ) : (
                      <ul>
                        {cliente.Contracts.map((contract, index) => (
                          <li key={`${contract.ultimo_pago}-${index}`}>{contract.ultimo_pago}</li>
                        ))}
                      </ul>
                    )
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>
                  {cliente.Contracts && cliente.Contracts.length > 0 ? (
                    cliente.Contracts.length === 1 ? (
                      cliente.Contracts[0].estado_contrato
                    ) : (
                      <ul>
                        {cliente.Contracts.map((contract, index) => (
                          <li key={`${contract.estado_contrato}-${index}`}>{contract.estado_contrato}</li>
                        ))}
                      </ul>
                    )
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`paginate ${currentPage === 1 ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronLeft style={{ width: '20px', height: '20px' }} />
            </span>
          </button>
          {pageNumbers.slice(currentPage - 1, currentPage + 15).map((number) => (
            <button key={number} onClick={() => paginate(number)} className={`paginate ${currentPage === number ? 'active' : ''}`}>
              <span className="page-number">{number}</span>
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} className={`paginate ${currentPage === pageNumbers.length ? 'active' : ''}`}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <BsChevronRight style={{ width: '20px', height: '20px' }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
