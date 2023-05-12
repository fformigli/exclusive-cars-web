import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { notImplementedYetRedirect } from "../lib/helpers";

export const configurations = (req: Request, res: Response) => notImplementedYetRedirect(req, res, '/admin')

export const getDocumentTypes = async () => {
  return prisma.configuration.findMany({
    where: {
      type: 'DOCUMENT_TYPES'
    }
  });
}

export const getRoles = async (context: string) => {
  return prisma.role.findMany({
    where: {
      context
    }
  })
}