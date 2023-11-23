const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      n_documento: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
      },
      tipo_documento: {
        type: DataTypes.ENUM('CC','CE', 'NIT','PP'),
        allowNull: false
      },
      tipo_persona: {
        type:  DataTypes.ENUM('P.JURIDICA', 'P.NATURAL' ),
      },
      name_razonSocial: {
        type: DataTypes.STRING
      },
      sexo: {
        type: DataTypes.ENUM('F', 'M' ),
      },  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      fecha_cumple:{
        type: DataTypes.DATEONLY,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
