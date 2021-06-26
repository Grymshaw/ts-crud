import Context from './types/context';
import LeadNote from '../models/leadNote';

import { CreateNoteInput, DeleteNoteInput } from '../types';

const notes = (_: any, { leadId }: { leadId: number }, { prisma, req }: Context) => (
    LeadNote.fetchNotes({ prisma, req, leadId })
);

const createLeadNote = async (
    _: any,
    { input }: { input: CreateNoteInput },
    { prisma, req }: Context,
) => ({
    leadNote: await LeadNote.createLeadNote({ prisma, req, input }),
});

const deleteLeadNote = async (
    _: any,
    { input }: { input: DeleteNoteInput },
    { prisma, req }: Context,
) => ({
    deletedLeadNote: await LeadNote.deleteLeadNote({ prisma, req, input }),
});

const Query = {
    notes,
};

const Mutation = {
    createLeadNote,
    deleteLeadNote,
};

export default {
    Query,
    Mutation,
};