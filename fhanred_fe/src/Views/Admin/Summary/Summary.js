import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField,Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../../Redux/Actions/actions";
import { useHistory } from "react-router-dom";

const Summary = () => {
  const history = useHistory(); 
  const [nDocumento, setNDocumento] = useState("");
  const [rows, setRows] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [isRequestSent, setIsRequestSent] = useState(false); // Nuevo estado
  const dispatch = useDispatch();
  const summaryData = useSelector((state) => state.summary);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userRole = useSelector((state) => state.authentication.user.id_role);
  const userNDocumento = useSelector((state) => state.authentication.user.n_documento);



const handleNDocumentoChange = (event) => {
  const value = event.target.value;
  setNDocumento(value);
  if (value.trim() === "") {
    setRows([]);
    setSaldoTotal(0);
  }
};


const handleSubmit = () => {
  if (nDocumento.trim() !== "" && !isNaN(nDocumento.trim())) {
    setIsRequestSent(true); // Establece que se envió una solicitud
    dispatch(fetchSummary(nDocumento.trim()));
  } else {
    console.error("Número de documento no válido");
  }
};

useEffect(() => {
  console.log("Effect triggered");
  if (
    isAuthenticated &&
    isRequestSent &&
    summaryData &&
    summaryData.formattedBills &&
    summaryData.formattedCash &&
    nDocumento.trim() !== "" &&
    !isNaN(nDocumento.trim())
  ) {
    console.log("Updating rows");
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
        {
          id: "",
          issue_date: "",
          type: "Saldo Total",
          price: "",
          saldo: saldo,
        },
      ];

      newRows.sort(
        (a, b) =>
          new Date(a.issue_date) - new Date(b.issue_date)
      );

      setRows(newRows);
      setSaldoTotal(saldo);
      setIsRequestSent(false); 
    }
  }, [isAuthenticated, summaryData, nDocumento, isRequestSent]);

  const getTypeName = (type) => {
    const typeMap = {
      Bill: "Factura",
      DebitNote: "Factura",
      CreditNote: "Factura",
      Cash: "Recibo",
    };
    return typeMap[type] || type;
  };

  const columns = [
    { field: "issue_date", headerName: "Fecha Emisión", width: 130 },
    { field: "id", headerName: "N° Comprobante", width: 150 },
    { field: "type", headerName: "Tipo Comprobante", width: 160 },
    { field: "price", headerName: "Importe", width: 100 },
    { field: "saldo", headerName: "Saldo", width: 100 },
    {
      field: "qrcode",
      headerName: "Ver Comprobante",
      width: 150,
      renderCell: (params) => {
        if (params.row.type === "Factura") {
          return (
            <a
              href={params.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Detalle
            </a>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <div className="containerRegister" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginBottom: 10 }}>
      {userRole !== 1 &&(
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

       )}
 <button type="button" onClick={() => history.push("/home")}>Volver</button>

      </div>

      {rows.length > 0 && (
        
           <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            style={{ marginTop: 10 }}
          />

          <div style={{ marginTop: 10 }}>
            Saldo Total: {saldoTotal}
          </div>
          <button style={{ marginTop: 10}}  type="button" onClick={() => history.push("/home")}>Volver</button>
          </Box>
        
      )}
    </div>
  );
};

export default Summary;
