const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_role"
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  });
};
