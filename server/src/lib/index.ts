import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../constants';

export const generateAccessToken = (userId: number) => ({
  accessToken: jwt.sign(
    { userId },
    process.env.TOKEN_SECRET as Secret,
    { expiresIn: `${ACCESS_TOKEN_EXPIRES_IN}s` },
  ),
  accessTokenExpiresIn: ACCESS_TOKEN_EXPIRES_IN,
});

async function deleteRefreshToken({ prisma, userId }: { prisma: PrismaClient, userId: number }) {
  try {
    await prisma.refreshToken.delete({ where: { userId } });
  } catch {
    console.log('No previous refreshToken for this user.');
  }
};

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
    where: { id: (<{ userId: number }>decoded).userId }
  });

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function generateRefreshToken({ prisma, userId }: { prisma: PrismaClient, userId: number }) {
  await deleteRefreshToken({ prisma, userId });

  const newRefreshToken = uuidv4();
  const refreshExpiryDelta = REFRESH_TOKEN_EXPIRES_IN * 60 * 1000;
  const refreshTokenExpiry = new Date(new Date().getTime() + refreshExpiryDelta);

  const newToken = await prisma.refreshToken.create({
    data: {
      refreshToken: newRefreshToken,
      user: {
        connect: { id: userId },
      },
      expiresAt: refreshTokenExpiry,
    },
  });

  return { refreshToken: newToken, refreshExpiryDelta };
}

interface GenerateAccessAndRefreshTokensArgs {
  prisma: PrismaClient;
  res: Response;
  userId: number;
}

export async function generateAccessAndRefreshTokens({ prisma, res, userId }: GenerateAccessAndRefreshTokensArgs) {
  const { refreshToken, refreshExpiryDelta } = await generateRefreshToken({ prisma, userId });
  const { accessToken, accessTokenExpiresIn } = generateAccessToken(userId);

  // const accessTokenExpires = new Date(new Date().getTime() + (ACCESS_TOKEN_EXPIRES_IN * 60 * 1000));

  res.cookie(
    'refreshToken',
    refreshToken.refreshToken.toString(),
    { maxAge: refreshExpiryDelta as number, httpOnly: true, secure: false },
  );

  return { accessToken, accessTokenExpiresIn };
};
