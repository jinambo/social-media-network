const { checkAuth } = require('../../util/auth')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const { registerValidate, loginValidate } = require('../../util/validate')
const User = require('../../models/User')

const createToken = user => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' })
}

const getUsers = async () => {
    try {
        const users = await User.find()
        return users
    } catch(err) {
        throw new Error(err)
    }
}

const getUsersIterate = async ( _, { first } ) => {
    try {
        const users = await User.find().limit(first)
        return users
    } catch(err) {
        throw new Error(err)
    }
}

const getUser = async (_, { username }) => {
    try {
        const user = await User.findOne({username: username})

        return user
    } catch(err) {
        throw new Error(err)
    }
}

module.exports = {
    Query: {
        getUsers,
        getUsersIterate,
        getUser,
    },    
    Mutation: {
        async upload(obj, args, context, info) {
            const file = await args.file;
            console.log(file);
        },
        
        async editUser(_, { userId, biography, pictureUrl }, context) {
            // Check logged user's token
            const user = checkAuth(context)

            // Profile that we wanna edit
            const profile = await User.findById(userId)

            // Is editing profile logged user's profile
            if (profile.username === user.username) {
                profile.biography = biography !== null ? biography : profile.biography
                profile.pictureUrl = pictureUrl !== null ? pictureUrl : profile.pictureUrl
            }

            // Save the changes
            await profile.save()

            return profile
        },

        async register(_, { registerInput: { username, email, password, confirmPassword, biography } }) {
            // Validate data
            const { valid, errors } = registerValidate(username, email, password, confirmPassword)

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            // Check if user already exists
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // Hash the password
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                biography,
                creationDate: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = createToken(res)

            return {
                id: res._id,
                token,
                ...res._doc
            }
        },

        async login(_, { loginInput: { username, password } }) {
            // Validate data
            const { errors, valid } = loginValidate(username, password)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            
            // Find user from the DB and check if it exists
            const user = await User.findOne({ username })
            if (!user) {
                errors.general = 'User is not registered'
                throw new UserInputError('User not found', { errors })
            }

            // Hash inserted password and comapare it with the hash in the DB
            const match = await bcrypt.compare(password, user.password) 
            if (!match) {
                errors.general = 'Wrong password'
                throw new UserInputError('Wrong password', { errors })
            }

            const token = createToken(user)

            return {
                id: user._id,
                token,
                ...user._doc
            }
        }
    }
}