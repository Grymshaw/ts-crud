import Context from './types/context';
import User from '../models/user';
import { LoginInput, SignupInput } from '../types';

const login = async (
  _: any,
  { input: { username, password } }: { input: LoginInput },
  { prisma, res }: Context,
) => (
  User.login({
    prisma,
    password,
    username,
    res,
  })
);

const signup = async (
  _: any,
  { input: { username, password, passwordConfirm } }: { input: SignupInput },
  { prisma, res }: Context,
) => (
  User.create({
    prisma,
    res,
    username,
    password,
    passwordConfirm,
  })
);

const Mutation = {
  login,
  signup,
};

export default {
  Mutation,
};
