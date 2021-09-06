const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('../config')

const checkAuth = (context) => {   
    const authHeader = context.req.headers.authorization

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]    

        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY)
                return user
            } catch (err) {
                throw new AuthenticationError('Token is invalid or expired.')
            }
        } else {
            throw new Error('Wrong format: Bearer <token>')
        }
    } else {
        throw new Error('Header is not provided')
    }
}

module.exports = {
    checkAuth
}