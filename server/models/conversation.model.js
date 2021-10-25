const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("conversation", {
    users: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
};
