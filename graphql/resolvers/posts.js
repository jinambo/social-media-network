const Post = require('../../models/Post')

const getPost = async () => {
    try {
        const posts = await Post.find()
        return posts
    } catch(err) {
        throw new Error(err)
    }
}

module.exports = {
    Query: {
        getPost
    }
}