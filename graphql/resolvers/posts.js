const { AuthenticationError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post')
const { checkAuth } = require('../../util/auth')

const getPosts = async () => {
    try {
        const posts = await Post.find().sort({ creationDate: -1 }) // -1 -> DESC
        return posts
    } catch(err) {
        throw new Error(err)
    }
}

const getPost = async (_, { postId }) => {
    try {
        const post = await Post.findById(postId)
        return post
    } catch(err) {
        throw new Error(err)
    }  
}

const getUsersPosts = async(_, { username }) => {
    try {
        const posts = await Post.find()

        if (posts) {
            return posts.filter(post => post.username === username);
        }
        
    } catch(err) {
        throw new Error(err)
    }   
}

const createPost = async (_, { content }, context) => {
    const user = checkAuth(context)

    console.log(user)

    const newPost = new Post({
        content: content,
        user: user.id,
        username: user.username,
        creationDate: new Date().toISOString()
    })

    const post = await newPost.save()
    return post
}

const removePost = async (_, { postId }, context) => {
    const user = checkAuth(context)

    try {
        const post = await Post.findById(postId)

        if (user.username === post.username) {
            await post.delete()
            return 'Post has been deleted.'
        } else {
            throw new AuthenticationError('You cannot delete someone else post!')
        }
    } catch (err) {
        throw new Error(err)
    }
}

const createComment = async (_, { postId, content }, context) => {
    const user = checkAuth(context)

    if (content.trim() === '') {
        throw new UserInputError('Comment cannot be empty!', { errors: { body: 'Comment cannot be empty!' } }) 
    }

    const post = await Post.findById(postId)
    if (post) {
        post.comments.unshift({
            content: content,
            username: user.username,
            creationDate: new Date().toISOString()
        })

        await post.save()
        return post
    } else {
        throw new UserInputError('Post not found')
    }
}

const removeComment = async (_, { postId, commentId }, context) => {
    const user = checkAuth(context)

    const post = await Post.findById(postId)
    if (post) {
        const comment = post.comments.filter(comment => {
            return comment.id === commentId
        })

        if (comment[0].username === user.username) {
            post.comments = post.comments.filter(c => {
                return c.id !== comment.id
            })

            await post.save()
            return post
        } else {
            throw new AuthenticationError('You cannot remove someone else comment')
        }
    } else {
        throw new UserInputError('Post not found')
    }
}

const toggleLike = async (_, { postId }, context) => {
    const user = checkAuth(context)

    const post = await Post.findById(postId)
    if (post) {
        // If post is liked
        if (post.likes.find(like => like.username === user.username)) {
            post.likes = post.likes.filter(like => like.username !== user.username)
            post.likes
        } else {
            post.likes.unshift({
                username: user.username,
                creationDate: new Date().toISOString()
            })
        }

        await post.save()
        return post
    } else {
        throw new UserInputError('Post not found')
    }
}

module.exports = {
    Query: {
        getPosts,
        getPost,
        getUsersPosts
    },
    Mutation: {
        createPost,
        removePost,
        createComment,
        removeComment,
        toggleLike
    }
}