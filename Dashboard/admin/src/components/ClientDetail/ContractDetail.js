import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContractDetails } from '../../Redux/Actions/actions';
import { useParams, Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import '../../global.css'
import Logo from '../../assets/Logo/2.png';

const ContractDetails = () => {
    const dispatch = useDispatch();
    const { id_Contract } = useParams();
    const contractDetails = useSelector(state => state.contractDetails);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
  
    useEffect(() => {
      dispatch(fetchContractDetails(id_Contract));
    }, [dispatch, id_Contract]);
    
    if (loading) {
      return <div>Cargando...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!contractDetails || !contractDetails.Plan) { 
      return null;
    }
  
    
    const {n_contrato, init_date,Plan, municipio, barrio_vereda,
         direccion, n_documento, estado_contrato,
         ultimo_pago, descuento,  deuda,idStratus,  caja_nap,
           retefuente,
           marca_onu, mac,
           reporte_c_riesgo, 
           estado_cp_correo, 
           id_inventory, } = contractDetails;
  
    return (
        <div >
            <div className="col-sm-4">
          <ButtonGroup className="mt-3">
            <Link to="/homePage">
              <Button>Volver</Button>
            </Link>
          </ButtonGroup>
        </div >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <h2 className="form-title">Detalles Contrato N° {n_contrato}</h2>
  <img src={Logo} alt="Logo de la compañía" style={{ width: '20%', height: '50%' }} />
</div>
            
        <div className="user-table">
        
        <table className="table">
          <tbody>
            <tr>
              <td className="label">Fecha de inicio</td>
              <td>{init_date}</td>
            </tr>
            <tr>
              <td className="label">Plan</td>
              <td>{Plan.name_plan}</td>
            </tr>
            <tr>
              <td>Plan Costo</td>
              <td>{Plan.costo}</td>
            </tr>
            <tr>
              <td>Municipio</td>
              <td>{municipio}</td>
            </tr>
            <tr>
              <td>Barrio</td>
              <td>{barrio_vereda}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>{direccion}</td>
            </tr>
            <tr>
              <td>Documento</td>
              <td>{n_documento}</td>
            </tr>
            <tr>
              <td>Estado Contrato</td>
              <td>{estado_contrato}</td>
            </tr>
            <tr>
              <td>Ultimo Pago</td>
              <td>{ultimo_pago}</td>
            </tr>
            <tr>
              <td>Descuento</td>
              <td>{descuento}</td>
            </tr>
            <tr>
              <td>Deuda</td>
              <td>{deuda}</td>
            </tr>
            <tr>
              <td>IdStratus</td>
              <td>{idStratus}</td>
            </tr>
            <tr>
              <td>Caja NAP</td>
              <td>{caja_nap}</td>
            </tr>
            <tr>
              <td>ReteFuente</td>
              <td>{retefuente}</td>
            </tr>
            <tr>
              <td>Marca Onu</td>
              <td>{marca_onu}</td>
            </tr>
            <tr>
              <td>Mac</td>
              <td>{mac}</td>
            </tr>
            <tr>
              <td>Reporte</td>
              <td>{reporte_c_riesgo}</td>
            </tr>
            <tr>
              <td>Estado cp Correo</td>
              <td>{estado_cp_correo}</td>
            </tr>
            <tr>
              <td>Id Inventory</td>
              <td>{id_inventory}</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      </div>
  );
};

export default ContractDetails;
