import jwt from 'jsonwebtoken';

export const protectRoute = (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token,'rahul121');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
}