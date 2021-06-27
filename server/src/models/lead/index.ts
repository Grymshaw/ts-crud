import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { CreateLeadInput, DeleteLeadInput, UpdateLeadInput, Lead } from '../../types';
import { isAuthenticated } from '../../lib';

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

// FIXME: Make this much better
const validateUpdateInput = (input: UpdateLeadInput) => {
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

const findOne = async ({ id, prisma, req }: { id: number, prisma: PrismaClient, req: Request }): Promise<Lead | null> => {
    const user = await isAuthenticated(prisma, req);

    const lead =  await prisma.lead.findUnique({
        where: { id },
        include: { notes: true },
    });

    return lead && (lead.userId === user.id) ? lead : null;
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

    return prisma.lead.create({
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
    });
};

const deleteOne = async ({ prisma, req, input }: { prisma: PrismaClient, req: Request, input: DeleteLeadInput }) => {
    const user = await isAuthenticated(prisma, req);

    const existingLead = await prisma.lead.findUnique({ where: { id: input.id } });

    if (!existingLead || (existingLead.userId !== user.id)) {
        throw new Error('Unauthorized')
    }

    // Delete notes for this lead before deleting note itself
    await prisma.leadNote.deleteMany({
        where: { leadId: input.id },
    });

    return prisma.lead.delete({ where: { id: input.id } });
};

const update = async (
    { prisma, req, input }: { prisma: PrismaClient, req: Request, input: UpdateLeadInput }
) => {
    const user = await isAuthenticated(prisma, req);

    const existingLead = await prisma.lead.findUnique({ where: { id: input.id as number } });

    console.log(input.id as number);

    console.log('existingLead: ', existingLead);
    console.log('\n\ninput: ', input);

    if (!existingLead || (existingLead.userId !== user.id)) {
        throw new Error('Unauthorized')
    }

    const valid = validateUpdateInput(input)

    return prisma.lead.update({
        where: { id: input.id as number },
        data: {
            name: input.name as string,
            email: input.email,
            phoneNumber: input.phoneNumber,
            website: input.website,
        }
    });
};

export default {
    findOne,
    findMany,
    create,
    deleteOne,
    update,
}