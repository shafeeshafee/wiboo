const { db, DataTypes, Model } = require('../db')

const { Chat } = require('./Chat')
const { User } = require('./User')

Chat.belongsTo(User)
User.hasMany(Chat)

module.exports = { Chat, User }