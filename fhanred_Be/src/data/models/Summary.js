const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Summary",
        {
            saldo: {
              type: DataTypes.FLOAT,
              allowNull: false,
              defaultValue: 0,
            },
            totalBills: {
              type: DataTypes.FLOAT,
              allowNull: false,
              defaultValue: 0,
            },
            totalDebitNotes: {
              type: DataTypes.FLOAT,
              allowNull: false,
              defaultValue: 0,
            },
            totalCreditNotes: {
              type: DataTypes.FLOAT,
              allowNull: false,
              defaultValue: 0,
            },
            totalReceipts: {
              type: DataTypes.FLOAT,
              allowNull: false,
              defaultValue: 0,
            }
        },
        {
          timestamps: false,
        }
      );
    };

    