const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Vivienda",
    {
        name_type: {
            type: DataTypes.STRING,
            primaryKey: true, 
            allowNull: false,
            unique: true,
          },
        },
        {
          timestamps: false,
        }
  );
};