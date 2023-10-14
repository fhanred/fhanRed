const { DataTypes} = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      idNum: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
      },
      typeId: {
        type: DataTypes.ENUM('CC','CE', 'NIT','PP'),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING,
      },
      CompanyName:  {
        type: DataTypes.STRING,

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "0000000000",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
      birthDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
