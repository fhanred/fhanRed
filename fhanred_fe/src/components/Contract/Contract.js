import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserContractsAction, showNoContractsModal, closeModal, cleanUserContracts } from "../../Redux/Actions/actions"; // Importa la acción showNoContractsModal
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./Contract.css";

const Contract = () => {
  const dispatch = useDispatch();
  const contractsData = useSelector((state) => state.userContracts);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const user = useSelector((state) => state.authentication.user);
  const isNoContractsModalOpen = useSelector((state) => state.isNoContractsModalOpen);
  const [hasContracts, setHasContracts] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user && user.n_documento) {
      dispatch(fetchUserContractsAction(user.n_documento));
    }
  }, [dispatch, isAuthenticated, user]);

  useEffect(() => {
    console.log("Contratos en el estado:", contractsData);
    if (contractsData.length === 0) {
      setHasContracts(false);
      dispatch(showNoContractsModal());
    } else {
      setHasContracts(true);
    }
  }, [dispatch, contractsData]);

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(cleanUserContracts()); // Limpia los contratos del usuario
  };

  return (
    <div className="contract-container">
      <Modal open={isNoContractsModalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>Contratar Fhanred</h2>
          <p>Puedes contratar Fhanred desde aquí.</p>
          <Button variant="contained" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </div>
      </Modal>

      {hasContracts && (
        <div>
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
                {contractsData.map((row) => (
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
      )}
    </div>
  );
};

export default Contract;
