import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
const result = dotenv.config()
//debug test
if (result.error) {
  throw result.error
}


const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '12h';

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const authMiddlewareUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        // console.log(req.user);
        if (req.user.role !== 'user') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authMiddlewareAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);
        req.admin = decoded;
        console.log(req.admin);
        if (req.admin.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};