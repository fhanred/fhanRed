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
        },
        {
          timestamps: false,
        }
      );
    };
    