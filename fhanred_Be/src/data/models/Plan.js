const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Plan",
    {
      id_plan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_plan",
      },
      name: {
        type: DataTypes.STRING,
      },
      costo: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
