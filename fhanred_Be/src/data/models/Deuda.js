const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Deuda',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'id_Deuda',
      },
      monto: {
        type: DataTypes.STRING,
      },
      // Agregar campo de inicio de deuda (fecha)
      periodo_en_mora: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
