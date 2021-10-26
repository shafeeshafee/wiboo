const path = require('path')
const fs = require('fs').promises

const { db } = require('./db')
const { User } = require('./models/index')

const seed = async () => {
    await db.sync({ force: true })

    const seedPath = path.join(__dirname, 'user.json')

    const buffer = await fs.readFile(seedPath)

    const { data } = JSON.parse(String(buffer))
    const userPromises = data.map(user => User.create(user))

    await Promise.all(userPromises)
    console.log('USER DATABASE POPULATED')

}

module.exports = seed
