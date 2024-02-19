const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Receipt",
        {
            number: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
          
        });
      }