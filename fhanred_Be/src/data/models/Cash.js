const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Cash",
        {
          receipt: {
            type: DataTypes.FLOAT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true 
          },
          contract: {
            type: DataTypes.STRING,
            allowNull: false
          },
          paymentDate: {
            type: DataTypes.DATE,
            allowNull: false
          },
          paymentTime: {
            type: DataTypes.STRING,
            allowNull: false
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false
          },
          municipio: {
            type: DataTypes.STRING,
            allowNull: false
          }, 
          direccion: {
            type: DataTypes.STRING,
            allowNull: false
          },

          importe: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false
          },
          cashierName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          
        })
      }