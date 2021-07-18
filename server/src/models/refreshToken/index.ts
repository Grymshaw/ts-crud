import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { generateAccessAndRefreshTokens } from '../../lib';

interface RefreshTokenArgs {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

async function refreshToken({ prisma, req, res }: RefreshTokenArgs) {
  const user = await prisma.refreshToken.findUnique({
    where: { refreshToken: req.cookies.refreshToken },
  }).user();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const { accessToken, accessTokenExpiresIn } = await generateAccessAndRefreshTokens({
    prisma,
    res,
    userId: user.id,
  });

  return {
    accessToken,
    accessTokenExpiresIn,
    user,
  };
}

export default {
  refreshToken,
};
