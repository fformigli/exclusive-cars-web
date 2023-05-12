import { Request, Response } from "express";

export const admin = (req: Request, res: Response) => {
  res.render('admin/admin.hbs');
};

