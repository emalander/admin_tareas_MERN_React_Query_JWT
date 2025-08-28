import JWT from 'jsonwebtoken'
import { Types } from 'mongoose'

type UserPayload= {
    id: Types.ObjectId
}

export const generateJWT = (payload:UserPayload) => {
    
    const token = JWT.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}