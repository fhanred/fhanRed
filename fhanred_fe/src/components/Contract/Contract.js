import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserContractsAction } from "../../Redux/Actions/actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Contract.css";


const Contract = () => {
  //se crea la funcion dispatch con el hook useDispatch
  const dispatch = useDispatch();
  //se accede al estado de redux para extraer los contratos cargados
  const contractsData = useSelector((state) => state.userContracts);
  const userInfo = useSelector(state => state.userInfo)


  useEffect(() => {  
    //aca se despacha la action que carga los contratos desde la base de datos, a partir del n de documento
    dispatch(fetchUserContractsAction(1119889568)); //aca tiene que ir el n de documento

  }, [])
  
  
  


  
  return (
    <div className="contract-container">
      <h2>Contratos del cliente</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N° de contrato</TableCell>
              <TableCell align="right">Dirección</TableCell>
              <TableCell align="right">Plan</TableCell>
              <TableCell align="right">Valor Contrato</TableCell>
              <TableCell align="right">Fecha de inicio</TableCell>
              <TableCell align="right">Último pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractsData?.map((row) => (
              <TableRow key={row.n_contrato}>
                <TableCell component="th" scope="row">
                  {row.n_contrato}
                </TableCell>
                <TableCell align="right">{row.Delivery.direccion}</TableCell>
                <TableCell align="right">{row.name_plan}</TableCell>
                <TableCell align="right">{row.Plan.costo}</TableCell>
                <TableCell align="right">{row.init_date}</TableCell>
                <TableCell align="right">{row.ultimo_pago}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Contract;
