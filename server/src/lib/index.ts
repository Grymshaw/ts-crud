import jwt, { Secret } from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES = '1h';

export const generateAccessToken = (userId: number) => ( 
    jwt.sign(
        { userId },
        process.env.TOKEN_SECRET as Secret,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
    )
);