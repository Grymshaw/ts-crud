import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES = '1h';

export const generateAccessToken = (userId: number) => ( 
    jwt.sign(
        { userId },
        process.env.TOKEN_SECRET as Secret,
        { expiresIn: ACCESS_TOKEN_EXPIRES },
    )
);

const getAuthHeaderToken = (req: Request) => (
    req.headers.authorization && req.headers.authorization.split(' ')[1]
);

export const isAuthenticated = async (prisma: PrismaClient, req: Request) => {
    const token = getAuthHeaderToken(req);

    if (!token) {
        throw new Error('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret)

    const user = await prisma.user.findUnique({
        where: { id: (<{userId: number}>decoded).userId } });

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}

