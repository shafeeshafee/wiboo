const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("message", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentChatReceiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};