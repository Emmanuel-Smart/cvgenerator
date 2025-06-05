import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await pool.query(
            'SELECT id, username, email FROM users WHERE id = $1',
            [decoded.id]
        );
        req.user = user.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};