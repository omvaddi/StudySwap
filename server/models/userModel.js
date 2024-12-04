const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    classes: [String],
    dateCreated: Date,
})

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel