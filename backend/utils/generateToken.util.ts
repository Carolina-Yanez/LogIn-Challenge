const jwt = require('jsonwebtoken')

export const generateToken = (email: string): string => {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES || '1h'
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }

    return jwt.sign({ email }, secret, { expiresIn })
}

export const verifyToken = (token: string) => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }
    
    return jwt.verify(token, secret)
}
