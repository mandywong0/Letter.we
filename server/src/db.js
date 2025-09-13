const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: isProduction && process.env.DATABASE_URL.includes("neon.tech")
    ? { ssl: { require: true, rejectUnauthorized: false } } // SSL only for hosted Neon
    : {}, // no SSL for local Neon testing
});

module.exports = sequelize;
