const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    classes: [String],
    dateCreated: Date,
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel