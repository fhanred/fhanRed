const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Ticket",
    {
      n_ticket: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'n_ticket',
      },
      ticket_type: {
        type: DataTypes.ENUM('MANTENIMIENTO', 'FALLA','FALLA MASIVA'),//TODO: ARMAR ENUM
        allowNull: false, // TODO: PREGUNTAR CRITERIO DE ALLOW NULL
      },
      reception_datetime: {
        type: DataTypes.DATE,
      },
      served_by: {
        type: DataTypes.STRING,
      },
      observations: {
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
      //PREGUNTAR A DIANA SI RELACIONAR TICKET CON DEUDA
    },
    {
      timestamps: false,
    }
  );
};
