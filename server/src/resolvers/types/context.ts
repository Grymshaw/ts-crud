// FIXME: Move this somewhere else??
import { PrismaClient } from ".prisma/client";
import { Request, Response } from 'express';

export default interface Context {
    prisma: PrismaClient
    req: Request
    res: Response
}
 