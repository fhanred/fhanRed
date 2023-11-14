const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Inventory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_inventory",
      },
      materiales: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
