import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { isAuthenticated } from '../../lib';
import { CreateNoteInput, DeleteNoteInput, UpdateNoteInput } from '../../types';

const findMany = async (
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

const create = async (
  { prisma, req, input }: { prisma: PrismaClient, req: Request, input: CreateNoteInput }
) => {
  await isAuthenticated(prisma, req);

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

const deleteOne = async (
  { prisma, req, input }: { prisma: PrismaClient, req: Request, input: DeleteNoteInput }
) => {
  await isAuthenticated(prisma, req);

  return prisma.leadNote.delete({
    where: { id: input.id },
  });
};

const update = async (
  { prisma, req, input }: { prisma: PrismaClient, req: Request, input: UpdateNoteInput }
) => {
  const user = await isAuthenticated(prisma, req);

  const existingNote = await prisma.leadNote.findUnique(
    { where: { id: input.id }, include: { lead: true } }
  );

  if (!existingNote || (existingNote.lead.userId !== user.id)) {
    throw new Error('Unauthorized');
  }

  return prisma.leadNote.update({
    where: { id: input.id },
    data: { note: input.note },
  });
};

export default {
  create,
  deleteOne,
  findMany,
  update,
};
