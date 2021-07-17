import bcrypt from 'bcrypt';

import { generateAccessAndRefreshTokens } from '../../lib';
import { CreateArgs, LoginArgs } from './types';

const login = async ({
  prisma,
  password,
  username,
  res,
}: LoginArgs) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error('Invalid username.');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid password.');
  }

  const { accessToken, accessTokenExpiresIn } = await generateAccessAndRefreshTokens({
    prisma,
    userId: user.id,
    res,
  });

  return {
    accessToken,
    accessTokenExpiresIn,
    user,
  };
};

const create = async ({ prisma, password, passwordConfirm, res, username }: CreateArgs) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (user) {
    throw new Error('Username already in use.');
  }

  if (password !== passwordConfirm) {
    throw new Error('Passwords do not match.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const { accessToken, accessTokenExpiresIn } = await generateAccessAndRefreshTokens({
    prisma,
    userId: newUser.id,
    res,
  })

  return {
    accessToken,
    accessTokenExpiresIn,
    user: newUser,
  }
};

export default {
  login,
  create,
};
