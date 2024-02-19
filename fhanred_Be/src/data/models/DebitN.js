const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "DebitN",
        {
          numberDN: {
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
          }
        });
      }