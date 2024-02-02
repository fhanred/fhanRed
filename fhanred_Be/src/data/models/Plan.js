const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Plan',
    {
      name_plan: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
