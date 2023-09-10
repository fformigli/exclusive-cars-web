import { NextFunction, Request, Response } from "express";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()){
    return next();
  }else {
    return res.redirect('/signin');
  }
}

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated())
    return next();
  return res.redirect('/profile');
}