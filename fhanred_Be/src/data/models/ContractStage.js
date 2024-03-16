const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'ContractStage',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM(
          'Petición de Contrato',
          'Adjudicación Técnica',
          'Firma de Contrato',
          'Preparado para Instalación',
          
        ),
        allowNull: false,
      },
     
    }
  );
}