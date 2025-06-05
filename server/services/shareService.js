import pool from '../db.js';
import crypto from 'crypto';

export const createShareLink = async (userId) => {
    const token = crypto.randomBytes(32).toString('hex');

    await pool.query(
        'INSERT INTO shares (cv_id, token) VALUES ($1, $2)',
        [userId, token]
    );

    return token;
};