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
        
         
            turno: {
                type: DataTypes.ENUM('Mañana', 'Tarde'),
                allowNull: false
            },
            taskDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
              }, 

        }
    );
};
