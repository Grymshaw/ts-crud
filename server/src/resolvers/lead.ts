import Context from "./types/context";
import LeadModel from '../models/lead';
import {
    Lead,
    CreateLeadInput,
    CreateLeadPayload,
    DeleteLeadInput,
    DeleteLeadPayload,
    UpdateLeadInput,
    UpdateLeadPayload,
} from "../types";

const lead = (_: any, { id }: { id: number }, { prisma, req }: Context): Promise<Lead | null> => (
    LeadModel.findOne({ id, prisma, req })
);

const leads = (_: any, _2: any, { prisma, req }: Context): Promise<Lead[]> => (
    LeadModel.findMany({ prisma, req })
);

const createLead = async (_: any, { input }: { input: CreateLeadInput }, { prisma, req }: Context) => ({
    lead: await LeadModel.create({ input, prisma, req })
});

const deleteLead = async (_: any, { input }: { input: DeleteLeadInput }, { prisma, req }: Context): Promise<DeleteLeadPayload> => ({
    deletedLead: await LeadModel.deleteOne({ prisma, req, input }),
});

// const updateLead = (_: any, { input }: { input: UpdateLeadInput }, ctx: Context): UpdateLeadPayload => {
// };

const Mutation = {
    createLead,
    deleteLead,
//     updateLead,
}

const Query = {
    lead,
    leads,
};

export default {
    Mutation,
    Query,
}