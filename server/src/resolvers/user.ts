import Context from './types/context';
import User from '../models/user';
import { LoginInput, SignupInput } from '../types';

const login = async (
    _: any,
    { input: { username, password } }: { input: LoginInput },
    { prisma }: Context,
) => {
    return;
};

const signup = async (
    _: any,
    { input: { username, password, passwordConfirm } }: { input: SignupInput },
    { prisma }: Context,
) => (
    User.create({
        prisma,
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