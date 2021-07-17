import Context from './types/context';
import RefreshTokenModel from '../models/refreshToken';
import { RefreshToken } from '../types';

function refreshToken(_: any, _2: any, { prisma, req, res }: Context) {
  return RefreshTokenModel.refreshToken({ prisma, req, res });
}

interface RefreshTokenParent {
  refreshToken: RefreshToken,
}

const RefreshToken = {
  user(parent: RefreshTokenParent, _: any, { prisma }: Context) {
    return prisma.user.findFirst({ where: { refreshToken: parent.refreshToken } });
  },
};

const Mutation = {
  refreshToken,
};

export default {
  Mutation,
  RefreshToken,
};
