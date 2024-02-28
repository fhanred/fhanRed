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
 <button type="button" onClick={() => history.push("/admin/home")}>Volver</button>

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



