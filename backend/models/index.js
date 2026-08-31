require("pg");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Sequelize = require("sequelize");

let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, {
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.quotes = require("./quote.model")(sequelize, Sequelize);

module.exports = db;
