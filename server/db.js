const { Sequelize, DataTypes, Model } = require("sequelize");

//ccreating a sequlize instance 
const db = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./Users.sqlite",
  logging: false,
});

module.exports = {
  db,
  DataTypes,
  Model,
};