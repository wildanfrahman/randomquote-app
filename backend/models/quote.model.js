const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Quotes = sequelize.define(
    "quotes",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quote: {
        type: DataTypes.STRING,
      },
      author: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Quotes;
};
