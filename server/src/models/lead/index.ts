import jwt, { Secret } from 'jsonwebtoken';
import { Prisma, PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { CreateLeadInput, CreateLeadPayload, Lead } from '../../types';

const isAuthenticated = async (prisma: PrismaClient, req: Request) => {
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

// FIXME: Make this much better
const validateCreateInput = (input: CreateLeadInput) => {
    if (!input.name || input.name.length < 3) {
        return false;
    }

    if (input.email && !input.email.includes('@')) {
        return false;
    }

    if (input.phoneNumber && String(input.phoneNumber).length < 7) {
        return false;
    }

    return true;
};

const getAuthHeaderToken = (req: Request) => (
    req.headers.authorization && req.headers.authorization.split(' ')[1]
);


const findOne = async ({ id, prisma, req }: { id: number, prisma: PrismaClient, req: Request }): Promise<Lead | null> => {
    const user = await isAuthenticated(prisma, req);

    const lead =  await prisma.lead.findUnique({
        where: { id },
        include: { notes: true },
    });

    return lead && lead.userId === user.id ? lead : null;
};

const findMany = async ({ prisma, req }: { prisma: PrismaClient, req: Request }): Promise<Lead[]> => {
    const user = await isAuthenticated(prisma, req);

    return prisma.lead.findMany({
        where: { userId: user.id },
    });
};

const create = async (
    { prisma, req, input, }: { prisma: PrismaClient, req: Request, input: CreateLeadInput }
) => {
    const user = await isAuthenticated(prisma, req);

    const valid = validateCreateInput(input)

    if (!valid) {
        throw new Error('Invalid input');
    }

    const { name, email, phoneNumber, website, note } = input;

    return {
        lead: await prisma.lead.create({
            data: {
                name,
                email,
                phoneNumber,
                website,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                notes: {
                    create: {
                        note
                    },
                },
            },
        }),
    };
};

export default {
    findOne,
    findMany,
    create,
}