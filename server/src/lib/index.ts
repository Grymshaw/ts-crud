import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES = 10;

export const generateAccessToken = (userId) => (
    jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES })
);