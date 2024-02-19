const { DataTypes } = require("sequelize");

/*
      ITEM: 1,
      TIPO: "INSTALACION CABLE E INTERNET",
      "NUMERO OS": 1,
      ABONADO: 1,
      "ESTADO ABONADO": "ACTIVO",
      NOMBRES: { "RAZON SOCIAL": "OCAMPO DURAN, ALVARO " },
      "DOC IDENTIDAD": "16613915",
      "SERVICIO INTERNET": "SERVICIO INTERNET",
      DEUDA: "0,00",
      MUNICIPIO: "CUMARAL",
      BARRIO: "FINCA",
      DIRECCION: "KILIAWIRINA ",
      DscSector: "GUACAVIA",
      TELEFONO: 3138713550,
      "TARIFA INTERNET2": "20 MB - PLATINO",
      FECHARECEPCION: "09/03/2021",
      HORARECEPCION: "09:05     ",
      FECHAEJECUCION: "13/03/2021",
      "HOR INICIO": "07:30      pm",
      "HOR FIN": "10:00      am",
      "NOMBRES VENDEDOR": "OFICINA OFICINA, OFICINA RESERVADO",
      "NOMBRES TECNICO": "GUZMAN JIMENEZ, WILMER EFRAIN",
      OBSERVACIONES: "",
      OBSERVACIONESTECNICO:
        "SE LE INSTALA EL SERVICIO DE INTERNET DEJANDO 236 METROS DE CABLE PARA UN TOTAL DE 366 METROS INSTALADOS SE UTILIZA 4 AMRRES 2 M.C",
      "DIRECCION (PLANO": {
        SECTOR: { RUTA: { "NROCASA)": "CUMARAL-GUACAVIA-FINCA-KILIAWIRINA " } },
      },
      "REF DIRECCION": "ESTRATO 2",
      "F RECEP.": "09/03/2021",
      HORA: "09:05     ",
      "F ATENC.": "13/03/2021",
      "ESTADO OS": "DESCARGADA",
      "PERSONA REGISTRO OS": "VIUCHE GUEVARA, ANGIE NATALIA",
      "PERSONA CERRO OS": "GUEVARA TAPIERO, YEIMI ",
      "FECHA CERRO OS": "15/03/2021",
      "HORA CERRO OS": "11:54:00",
      "MATERIALES UTILIZADOS": "",
      "MATERIALES RECOGIDOS": "",
      POSTE: "",
      "PUNTAJE OS": 0,
      FIELD39: "",
*/

module.exports = (sequelize) => {
  sequelize.define(
    "Ticket",
    {
      n_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_ticket',
      },
      ticket_type: {
        type: DataTypes.ENUM('INSTALACION CABLE E INTERNET','MANTENIMIENTO', 'FALLA','FALLA MASIVA'),//TODO: ARMAR ENUM
        allowNull: false, // TODO: PREGUNTAR CRITERIO DE ALLOW NULL
      },
      ticket_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      reception_datetime: {
        type: DataTypes.DATE,
      },
      served_by: {
        type: DataTypes.STRING,
      },
      technician: {
        type: DataTypes.STRING,
      },
      observations: {
        type: DataTypes.TEXT,
      },
      tech_observations: {
        type: DataTypes.TEXT,
      },
      phone:{
        type: DataTypes.STRING,
      },
      poste:{
        type: DataTypes.STRING,
      },
      field_39:{
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('EN PROGRESO','PENDIENTE', 'CERRADO', 'DESCARGADA'),
      },
      created_by: {
        type: DataTypes.STRING,
      },
      closed_by: {
        type: DataTypes.STRING,
      },
      opening_datetime: {
        type: DataTypes.DATE,
      },
      closing_datetime: {
        type: DataTypes.DATE,
      },
      used_materials: {
        type: DataTypes.TEXT,
      },
      collected_materials: {
        type: DataTypes.TEXT,
      },
      debt: {
        type: DataTypes.STRING,
      },
      //PREGUNTAR A DIANA SI RELACIONAR TICKET CON DEUDA
    },
    {
      timestamps: false,
    }
  );
};
