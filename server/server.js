const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { User } = require('./models/User')
const { Chat } = require('./models/Chat')

seed()

//*************** ROUTES ******************//
app.get('/allUsers', async (req, res) => {
    let allUsers = await User.findAll()  
    res.json({allUsers})
})

app.get('/allChats', async (req, res) => {
    let allChats = await Chat.findAll()  
    res.json({allChats})
})

app.listen( PORT, () => {
    console.log(` Your server is now listening to port ${PORT}`)
})