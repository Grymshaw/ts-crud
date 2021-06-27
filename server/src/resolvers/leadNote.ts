import Context from './types/context';
import LeadNote from '../models/leadNote';

import { CreateNoteInput, DeleteNoteInput, UpdateNoteInput } from '../types';

const notes = (_: any, { leadId }: { leadId: number }, { prisma, req }: Context) => (
    LeadNote.findMany({ prisma, req, leadId })
);

const createLeadNote = async (
    _: any,
    { input }: { input: CreateNoteInput },
    { prisma, req }: Context,
) => ({
    leadNote: await LeadNote.create({ prisma, req, input }),
});

const deleteLeadNote = async (
    _: any,
    { input }: { input: DeleteNoteInput },
    { prisma, req }: Context,
) => ({
    deletedLeadNote: await LeadNote.deleteOne({ prisma, req, input }),
});

const updateLeadNote = async (
    _: any,
    { input }: { input: UpdateNoteInput },
    { prisma, req }: Context,
) => ({
    leadNote: await LeadNote.update({ prisma, req, input }),
})

const Query = {
    notes,
};

const Mutation = {
    createLeadNote,
    deleteLeadNote,
    updateLeadNote,
};

export default {
    Query,
    Mutation,
};