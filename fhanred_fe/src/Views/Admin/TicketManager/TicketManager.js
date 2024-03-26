import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { data } from "./tickets";
import "./TicketManager.css";
import { TextField } from "@material-ui/core";

export default function TicketManager() {
  //const news = useAppSelector(selectNews);

  const [ticketsState, setTicketsState] = useState({
    ticketsArray: [],
  });

  //   useEffect(() => {
  //     dispatch(getNews());
  //   }, []);

  useEffect(() => {
    let cleanTickets = [];

    data.forEach((item) => {
      let cleanTicket = {
        n_ticket: item["NUMERO OS"],
        ticket_type: item.TIPO,
        ticket_date: item.FECHARECEPCION, // Define la lógica para obtener la fecha del JSON (si es necesario),
        reception_datetime: item.FECHARECEPCION, // Define la lógica para obtener la fecha de recepción del JSON,
        served_by: item["PERSONA REGISTRO OS"],
        technician: item["NOMBRES TECNICO"],
        observations: item.OBSERVACIONES,
        tech_observations: item.OBSERVACIONESTECNICO,
        phone: item.TELEFONO,
        poste: item.POSTE,
        field_39: item.FIELD39,
        status: item["ESTADO OS"],
        created_by: item["PERSONA REGISTRO OS"], // Define la lógica para obtener el creador del JSON,
        closed_by: item["PERSONA CERRO OS"],
        opening_datetime: item["FECHA CERRO OS"], // Define la lógica para obtener la fecha de apertura del JSON,
        closing_datetime: item["FECHA CERRO OS"], // Define la lógica para obtener la fecha de cierre del JSON,
        used_materials: item["MATERIALES UTILIZADOS"],
        collected_materials: item["MATERIALES RECOGIDOS"],
        debt: item.DEUDA,
      };
      cleanTickets.push(cleanTicket);
    });
    setTicketsState({
      ...ticketsState,
      ticketsArray: cleanTickets,
    });
    console.log("estado despues del setstate", ticketsState);
  }, []);

  const ticketHeaders = [
    {
      title: "Número de Ticket",
      field: "n_ticket",
    },
    {
      title: "Tipo de Ticket",
      field: "ticket_type",
    },
    {
      title: "Fecha de Recepción",
      field: "reception_datetime",
      render: (item) => (
        <time dateTime={item.reception_datetime}>
          {new Date(item.reception_datetime).toDateString()}
        </time>
      ),
    },
    {
      title: "Atendido Por",
      field: "served_by",
    },
    {
      title: "Técnico",
      field: "technician",
    },
    {
      title: "Observaciones",
      field: "observations",
    },
    {
      title: "Observaciones Técnico",
      field: "tech_observations",
    },
    {
      title: "Teléfono",
      field: "phone",
    },
    {
      title: "Poste",
      field: "poste",
    },
    {
      title: "Field 39",
      field: "field_39",
    },
    {
      title: "Estado",
      field: "status",
    },
    {
      title: "Creado Por",
      field: "created_by",
    },
    {
      title: "Cerrado Por",
      field: "closed_by",
    },
    {
      title: "Fecha de Apertura",
      field: "opening_datetime",
      render: (item) => (
        <time dateTime={item.opening_datetime}>
          {new Date(item.opening_datetime).toDateString()}
        </time>
      ),
    },
    {
      title: "Fecha de Cierre",
      field: "closing_datetime",
      render: (item) => (
        <time dateTime={item.closing_datetime}>
          {new Date(item.closing_datetime).toDateString()}
        </time>
      ),
    },
    {
      title: "Materiales Utilizados",
      field: "used_materials",
    },
    {
      title: "Materiales Recogidos",
      field: "collected_materials",
    },
    {
      title: "Deuda",
      field: "debt",
    },
    // Añade otros campos según sea necesario
  ];

  return (
    <div className="table">
      {ticketsState.ticketsArray.length ? (
        <MaterialTable
          columns={ticketHeaders}
          data={ticketsState.ticketsArray}
          title="Administrador de Tickets"
          options={{ pageSize: 10 }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

/* const headers = [
    {
      title: "Image",
      field: "image",
      render: (item) => <img src={item.urlToImage} style={{ width: 100 }} />,
    },
    {
      title: "Source",
      field: "source",
    },
    {
      title: "Author",
      field: "author",
    },
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Date",
      field: "publishedAt",
      render: (item) => (
        <time dateTime={item.publishedAt}>
          {item.publishedAt.toDateString()}
        </time>
      ),
    },
    {
      title: "URL",
      field: "url",
      render: (item) => (
        <Button variant="contained" href={item.url}>
          Link
        </Button>
      ),
    },
  ];
 */
