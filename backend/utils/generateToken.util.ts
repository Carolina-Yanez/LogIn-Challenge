const jwt = require('jsonwebtoken')

const secret = process.env['JWT_SECRET'] as string
const expiresIn = process.env['JWT_EXPIRES'] || '1h'

export const generateToken = (email: string): string => {
    
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }

    return jwt.sign({ email }, secret, { expiresIn })
}

export const verifyToken = (token: string) => {
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }
    
    return jwt.verify(token, secret)
}
