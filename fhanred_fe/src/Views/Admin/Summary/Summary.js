import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../../Redux/Actions/actions";

const Summary = () => {
  const [nDocumento, setNDocumento] = useState("");
  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state.summary);


  useEffect(() => {
    if (summaryData && summaryData.formattedBills && summaryData.formattedBills.length > 0) {
      console.log("Formatted Bills:", summaryData.formattedBills);
    }
  }, [summaryData]);

  const handleNDocumentoChange = (event) => {
    setNDocumento(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(fetchSummary(nDocumento));
  };

  if (!summaryData) {
    return (
      <div className="container">
        <TextField
          label="Número de documento"
          value={nDocumento}
          onChange={handleNDocumentoChange}
        />
        <Button onClick={handleSubmit}>Buscar</Button>
        
      </div>
    );
  }

  
   const bills = summaryData && summaryData.data ? summaryData.formattedBills : [];
// const saldo = summaryData && summaryData.data ? summaryData.data.saldo : 0;
// const userData = summaryData && summaryData.data ? summaryData.data.user : {};
// const cashPayments = summaryData && summaryData.data ? summaryData.data.cash : [];
// const debitNotes = summaryData && summaryData.data ? summaryData.data.debitNotes : [];
// const creditNotes = summaryData && summaryData.data ? summaryData.data.creditNotes : []; 

  const columns = [
    //{ field: "id", headerName: "ID", width: 70 },
    { field: "issue_date", headerName: "Fecha de Emisión", width: 200 },
    { field: "numberI", headerName: "Número Comprobante", width: 130 },
    { field: "party_identification", headerName: "Tipo comprobante", width: 200 },
    { field: "price", headerName: "Importe", width: 130 },
    { field: "qrcode", headerName: "Ver", width: 200 }
  ];



  return (
    <div className="container">
      <div style={{ marginBottom: 10 }}>
        <TextField
          label="Número de documento"
          value={nDocumento}
          onChange={handleNDocumentoChange}
        />
        <Button onClick={handleSubmit}>Buscar</Button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={bills}
          columns={columns}
        />
        
      </div>
     
    </div>
  );
};

export default Summary;



// {
//   "user": {
//       "n_documento": "1119889568",
//       "tipo_documento": "CC",
//       "tipo_persona": "P.NATURAL",
//       "name_razonSocial": "GUERRA TRUJILLO, NICOLAS ",
//       "sexo": "M",
//       "email": "NICILASGUERRATRU1991@GMAIL.COM",
//       "password": null,
//       "fecha_cumple": "1991-09-18",
//       "active": true,
//       "deletedAt": null,
//       "createdAt": "2024-02-20T19:21:23.103Z",
//       "updatedAt": "2024-02-22T10:24:14.674Z",
//       "id_role": 1
//   },
//   "saldo": 66000,
//   "formattedBills": [
//       {
//           "type": "Bill",
//           "date": "2023-12-29T12:14:12.000Z",
//           "amount": 66000,
//           "qrUrl": "https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=99569e4f13e221499142d446b879ee808ade9e593837e9a2efda1c3fa8189a2a81db6d473da7c9d736311df3bc090b4e"
//       },
//       {
//           "type": "Bill",
//           "date": "2023-12-29T12:14:37.000Z",
//           "amount": 66000,
//           "qrUrl": "https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=a93d0a987274793a6f73b1312b8a9059e3c92655a7874618d767cac6c175d1dd69d2d1492355dbefb037e7459c6c3e28"
//       },
//       {
//           "type": "Bill",
//           "date": "2024-02-02T01:14:55.000Z",
//           "amount": 66000,
//           "qrUrl": "https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=d1af08d4bcb7bc0d23a8647076c52dafb1eeaa62821418a9acf81f28171aeb2207cf2b58a1d253fab8263f874adc98ad"
//       },
//       {
//           "type": "Bill",
//           "date": "2024-02-02T01:14:55.000Z",
//           "amount": 66000,
//           "qrUrl": "https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=1ee278a8e39a5e28f4fea8401a2d4e226f5ffa42029e9aa0d93dae3f553acb8162c2df200f6f66470f2e36585866d578"
//       }
//   ],
//   "formattedDebitNotes": [],
//   "formattedCreditNotes": [],
//   "formattedCash": [
//       {
//           "type": "Cash"
//       },
//       {
//           "type": "Cash"
//       },
//       {
//           "type": "Cash"
//       }
//   ]
//}