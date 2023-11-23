const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Contract",
    {
      n_contrato: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    
      },
      init_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      caja_nap: {
        type: DataTypes.STRING,
      },
      deuda: {
        type: DataTypes.STRING,
      },
      ultimo_pago: {
        type: DataTypes.DATEONLY,
      },
      tel1: {
        type: DataTypes.STRING,
      },
      tel2: {
        type: DataTypes.STRING,
      },
      tel3: {
        type: DataTypes.STRING,
      },
      marca_onu: {
        type: DataTypes.STRING,
      },
      mac: {
        type: DataTypes.STRING,
      },
      reporte_c_riesgo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      estado_cp_correo: {
        type: DataTypes.BOOLEAN,
      },
      estado_contrato: {
        type: DataTypes.ENUM('ACTIVO', 'RETIRADO', 'CORTADO','ANULADO', 'POR INSTALAR' ),
      },
    },
    {
      timestamps: false,
    }
  );
};
