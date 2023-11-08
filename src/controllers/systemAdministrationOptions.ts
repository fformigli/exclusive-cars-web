import { Request, Response } from "express";

export const systemAdministrationOptions = (req: Request, res: Response) => {
  res.render('admin/admin.hbs');
};

export const financialManagementOptions = (req: Request, res: Response) => {
  res.render('financial-management/options.hbs');
  // todo prepare options
};

