import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../../Redux/Actions/actions";
import { useHistory } from "react-router-dom";

const Summary = () => {
  const history = useHistory();
  const [nDocumento, setNDocumento] = useState("");
  const [rows, setRows] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state.summary);
  const handleNDocumentoChange = (event) => {
    setNDocumento(event.target.value);
  };

  const handleSubmit = () => {
    if (nDocumento.trim() !== "" && !isNaN(nDocumento.trim())) {
      dispatch(fetchSummary(nDocumento));

    } else {
      
      console.error("Número de documento no válido");
    }
  };

  useEffect(() => {
    if (
      summaryData &&
      nDocumento.trim() !== "" &&
      !isNaN(nDocumento.trim())
    ) {
      if (summaryData.formattedBills && summaryData.formattedCash) {
        let saldo = 0;
        const newRows = [
          ...summaryData.formattedBills.map((bill, index) => {
            saldo += bill.amount; 
            return {
              id: `FHA${bill.id !== undefined ? bill.id : index}`,
              issue_date: new Date(bill.date).toLocaleString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              type: getTypeName(bill.type),
              price: bill.amount,
              saldo: saldo,
              qrcode: bill.qrUrl,
            };
          }),
          ...summaryData.formattedCash.map((cashItem, index) => {
            saldo -= cashItem.amount; 
            return {
              id: `R ${cashItem.id !== undefined ? cashItem.id : index}`,
              issue_date: new Date(cashItem.date).toLocaleString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              type: getTypeName(cashItem.type),
              price: -cashItem.amount, 
              saldo: saldo, 
            };
          }),

          // A
          {
            id: "",
            issue_date: "", 
            type: "Saldo Total",
            price: "",
            saldo: saldo, 
          },
        ];
       
        newRows.sort((a, b) => new Date(a.issue_date) - new Date(b.issue_date));

        setRows(newRows);
        setSaldoTotal(saldo); 
      } else {
        setRows([]);
        setSaldoTotal(0); // Reinicia el saldo total si no hay datos
      }
    } else {
      setRows([]);
      setSaldoTotal(0); // Reinicia el saldo total si no hay datos
    }
  }, [summaryData, nDocumento]);


  const getTypeName = (type) => {
    const typeMap = {
      Bill: "Factura",
      DebitNote: "Factura",
      CreditNote: "Factura",
      Cash: "Recibo",
    };
    return typeMap[type] || type;
  };

  // Columnas para el DataGrid
  const columns = [
    { field: "issue_date", headerName: "Fecha Emisión", width: 150 },
    { field: "id", headerName: "Número Comprobante", width: 150 },
    { field: "type", headerName: "Tipo Comprobante", width: 200 },
    { field: "price", headerName: "Importe", width: 150 },
    { field: "saldo", headerName: "Saldo", width: 150 },
    {
      field: "qrcode", headerName: "Ver Comprobante", width: 150,
      renderCell: (params) => {
        // Verificar si el tipo de comprobante es "Factura" para mostrar el enlace
        if (params.row.type === "Factura") {
          return (
            <a href={params.value} target="_blank" rel="noopener noreferrer">
              Ver Detalle
            </a>
          );
        } else {
          return null; // Devolver null cuando el tipo de comprobante sea "Recibo"
        }
      },
    },
    // No se proporciona el campo "saldo" ya que no se definió en las filas
  ];

  // Renderizar el componente
  return (
    <div className="containerRegister" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {/* Contenedor para el TextField y el Button */}
      <div style={{ marginBottom: 10 }}>
        <TextField
          label="Número de documento"
          value={nDocumento}
          onChange={handleNDocumentoChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          style={{ marginRight: 10 }}
        />
 <button type="button" onClick={() => history.push("/admin/caja")}>Volver</button>

      </div>

      {/* Contenedor para el DataGrid */}
      {rows.length > 0 && (
        <div style={{ width: '100%', height: '100%', marginTop: 10 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            style={{ marginTop: 10 }}
          />
          <div style={{ marginTop: 10 }}>
            Saldo Total: {saldoTotal}
          </div>
        </div>

      )}
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
//}{
