const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')
const Group = require('./groupModel')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/user")

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})

app.post('/api/group', (req, res) => {
    const newGroup = new Group({
        name: req.body.name,
        code: req.body.code,
    });
      
    newGroup.save()
        .then(group => res.status(201).json(group));
  });
  
app.listen(3001, () => {
    console.log("server is running")
})