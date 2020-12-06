import Sequelize from "sequelize";

module.exports = new Sequelize("application", "marcus", "marcus", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
