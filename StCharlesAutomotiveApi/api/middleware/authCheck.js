import mongoose from 'mongoose';
import { UserSchema } from '../models/user';
const User = mongoose.model('User', UserSchema)
const jwt = require('jsonwebtoken');


export const verifyToken = async (req, res, next) => {
    let token = null;
    let bearer = null;
    try {
        const authorizationHeader = req.headers["authorization"];

        if(typeof authorizationHeader == 'undefined') {
            return res.status(403).json({ error: "no header authorization param", statusCode: 403 });
        }

        bearer = authorizationHeader.split(' ')
        token = bearer[1]

        if (!token) {
            return res.status(403).json({ error: "No token provided", statusCode: 403 });
        }

        const decoded = jwt.verify(token, 'secretKey')
        req.userId = decoded.id;

        let user = null;

        try {
            user = await User.findById(req.userId, { password: 0 })
        } catch (error) {
            return res.status(400).json({ error: error.keyValue, statusCode: 400 });
        }

        if (!user) {
            return res.status(404).json({ error: "JWT: User does not exist, please check your token", statusCode: 404 });
        }

        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized", statusCode: 401 });
    }
}