const path = require('path')
const fs = require('fs').promises

const { db } = require('./db')
const { Chat } = require('./models/index')
const { User } = require('./models/index')

const seed = async () => {
    await db.sync({ force: true })

    const seedPath = path.join(__dirname, 'user.json')
    const seedPath2 = path.join(__dirname, 'chat.json')

    const buffer = await fs.readFile(seedPath)
    const buffer2 = await fs.readFile(seedPath2)

    const { data } = JSON.parse(String(buffer))
    const { data2 } = JSON.parse(String(buffer2))

    const userPromises = data.map(user => User.create(user))
    const chatPromises = data.map(chat => Chat.create(chat))

    await Promise.all(userPromises)
    await Promise.all(chatPromises)
    console.log('USER AND CHAT DATABASE POPULATED')

}

module.exports = seed