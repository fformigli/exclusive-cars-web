import { NextFunction, Request, Response } from "express";

const passport = require('passport');

export const signUpGet = (req: Request, res: Response) => {
  res.render('auth/signUp');
};

export const signUpPost = passport.authenticate('local.signUp', {
  successRedirect: '/admin/users',
  failureRedirect: '/signUp',
  failureFlash: true
});

export const signInGet = (req: Request, res: Response) => {
  res.render('auth/signIn');
};

export const signInPost = (req: Request, res: Response, next: NextFunction) => {
  console.log("signInPost 1")
  passport.authenticate('local.signIn', {
    successRedirect: '/',
    failureRedirect: '/signIn',
    failureFlash: true
  })(req, res, next);
};

export const profile = (req: Request, res: Response) => {
  res.render('auth/profile');
};

export const forbidden = (req: Request, res: Response) => {
  req.flash('message', 'No posee permisos para ver esta página');
  res.redirect('/profile');
};

export const logout = (req: Request, res: Response) => {
  req.logout((e: any) => {
    console.error(e)
  });
  res.redirect('/signIn');
};

export const apiLogin = (req: Request, res: Response) => {
  const user = { userId: 1, displayName: "test ok" }
  res.json(user)
}