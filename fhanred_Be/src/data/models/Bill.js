const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Bill",
        {
          numberI: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          issue_date: {
            type: DataTypes.DATE,
            allowNull: false
          },
          party_identification: {
            type: DataTypes.STRING,
            allowNull: true
          },
          qrcode: {
            type: DataTypes.TEXT, 
            allowNull: true, 
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: true,

          }
          
        });
        
      }