const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Delivery',
    {
      id_delivery: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id_delivery',
      },
      municipio: {
        type: DataTypes.STRING,
      },
      barrio_vereda: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
