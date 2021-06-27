import Context from './types/context';
import User from '../models/user';
import { LoginInput, SignupInput } from '../types';

const login = async (
    _: any,
    { input: { username, password } }: { input: LoginInput },
    { prisma, res }: Context,
) => ({
    user: User.login({
        prisma,
        password,
        username,
        res,
    })
});

const signup = async (
    _: any,
    { input: { username, password, passwordConfirm } }: { input: SignupInput },
    { prisma }: Context,
) => ({
    user: User.create({
        prisma,
        username,
        password,
        passwordConfirm,
    })
});

const Mutation = {
    login,
    signup,
};

export default {
    Mutation,
};