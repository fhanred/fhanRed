const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "TaskAsign",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
        
         
            startTurno: {
                type: DataTypes.TIME,
                allowNull: false
            },
            endTurno: {
                type: DataTypes.TIME,
                allowNull: false
            },
            taskDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
              }, 

        },
        {
            dialectOptions: {
              timezone: "Etc/GMT-5",
            },
          }
    );
};
