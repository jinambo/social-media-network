const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    content: String,
    images: [{
        url: String,
        alt: String
    }],
    username: String,
    creationDate: String,
    comments: [{
        content: String,
        username: String,
        creationDate: String
    }],
    likes: [{
        username: String,
        creationDate: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)