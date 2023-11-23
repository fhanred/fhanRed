const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Vivienda',
    {
      id_vivienda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id_vivienda',
      },
      name_type: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
