const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const ENV = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${ENV}` });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos MySQL con Sequelize.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

module.exports = sequelize;
