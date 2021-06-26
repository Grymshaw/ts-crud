import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { isAuthenticated } from '../../lib';
import { CreateNoteInput, DeleteNoteInput } from '../../types';

const fetchNotes = async (
    { prisma, req, leadId }: { prisma: PrismaClient, req: Request, leadId: number }
) => {
    const user = await isAuthenticated(prisma, req);

    return prisma.leadNote.findMany({
        where: {
            leadId,
            lead: {
                userId: user.id,
            },
        },
    });
};

const createLeadNote = async (
    { prisma, req, input }: { prisma: PrismaClient, req: Request, input: CreateNoteInput }
) => {
    const user = await isAuthenticated(prisma, req);

    if (input.note.length < 2) {
        throw new Error('Note is too short');
    }

    return prisma.leadNote.create({
        data: {
            note: input.note,
            leadId: input.leadId,
        },
    });
};

const deleteLeadNote = async (
    { prisma, req, input }: { prisma: PrismaClient, req: Request, input: DeleteNoteInput } 
) => {
    const user = await isAuthenticated(prisma, req);

    return prisma.leadNote.delete({
        where: { id: input.id },
    });
};

export default {
    createLeadNote,
    deleteLeadNote,
    fetchNotes,
};