// TODO: Move this somewhere else in the code base?
import { Response } from 'express';
import { PrismaClient } from "@prisma/client";

export interface LoginArgs {
  prisma: PrismaClient;
  password: string;
  username: string;
  res: Response;
}

export interface CreateArgs {
  prisma: PrismaClient;
  res: Response;
  password: string;
  passwordConfirm: string;
  username: string;
}
