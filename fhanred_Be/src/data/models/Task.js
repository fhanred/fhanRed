const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Task",
        {

            taskId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                
              },
          
          
            nameTask: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                
            },

       
        },
        {
            timestamps: false,
          }

    );


};

