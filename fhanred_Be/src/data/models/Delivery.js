const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Delivery",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_Delivery",
      },
      municipio: {
        type: DataTypes.STRING,
      },
      barrio_vereda: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.TEXT
      },
      tipo_vivienda: {
        type: DataTypes.ENUM("ALQUILADA", "PROPIA", "FAMILIAR", "TIENDA", "INSTITUCIONES", "EDIFICIO", "HOSTAL_HOTEL","FINCA"),
      },
    },
    {
      timestamps: false,
    }
  );
};
