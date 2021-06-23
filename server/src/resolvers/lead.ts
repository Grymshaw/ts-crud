import Context from "./types/context";
import {
    Lead,
    CreateLeadInput,
    CreateLeadPayload,
    DeleteLeadInput,
    DeleteLeadPayload,
    UpdateLeadInput,
    UpdateLeadPayload,
} from "../types";

const lead = (_: any, { id: number }, ctx: Context): Lead => {};

const leads = (_: any, _2: any, ctx: Context): [Lead] => {};

const createLead = (_: any, { input }: { input: CreateLeadInput }, ctx: Context): CreateLeadPayload => {
};

const deleteLead = (_: any, { input }: { input: DeleteLeadInput }, ctx: Context): DeleteLeadPayload => {
};

const updateLead = (_: any, { input }: { input: UpdateLeadInput }, ctx: Context): UpdateLeadPayload => {
};

const Mutation = {
    createLead,
    deleteLead,
    updateLead,
}

const Query = {
    lead,
    leads,
};

export default {
    Mutation,
    Query,
}