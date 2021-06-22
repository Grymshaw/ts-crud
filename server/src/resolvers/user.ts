import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import User from '../models/user';

interface ResolverCtx {
    prisma: PrismaClient
    request: Request
    response: Response
}

const loginUser = async (_, { input }, { prisma }: ResolverCtx) => {
};

const signupUser = async (_, { input }, { prisma }) => (
    User.create({
        prisma,
        username: input.username,
        password: input.password,
        passwordConfirm: input.passwordConfirm,
    })
);

const Mutation = {
    loginUser,
    signupUser,
};

export default {
    Mutation,
};