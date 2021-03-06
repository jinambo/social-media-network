const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    pictureUrl: String,
    biography: String,
    creationDate: String
})

module.exports = model('User', userSchema)