const jwt = require('jsonwebtoken')

interface TokenPayload{
    email: string;
    role: 'USER' | 'ADMIN'
}

export const generateToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES || '1h'
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }

    return jwt.sign(payload, secret, { expiresIn })
}

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not defined')
    }
    
    return jwt.verify(token, secret) as TokenPayload
}
