const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Documentation",
        {
            id_Documentation: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            dni: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            sign: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    )
}