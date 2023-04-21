import { Request, Response } from "express";

export const home = (req: Request, res: Response) => {
  console.log('render home')
  return res.render('home/home.hbs')
}