import Context from './types/context';
import RefreshTokenModel from '../models/refreshToken';
import { RefreshToken, RefreshTokenPayload } from '../types';

function refreshToken(_: any, _2: any, { prisma, req, res }: Context): Promise<RefreshTokenPayload> {
  return RefreshTokenModel.refreshToken({ prisma, req, res });
}

interface RefreshTokenParent {
  refreshToken: RefreshToken,
}

const RefreshToken = {
  user({ refreshToken }: RefreshTokenParent, _: any, { prisma }: Context) {
    return prisma.refreshToken.findUnique({ where: { id: refreshToken.id } }).user();
  },
};

const Mutation = {
  refreshToken,
};

export default {
  Mutation,
  RefreshToken,
};
