const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    creationDate: String
})

module.exports = model('User', userSchema)