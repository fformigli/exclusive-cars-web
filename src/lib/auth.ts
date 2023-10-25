import { NextFunction, Request, Response } from "express";
import { Permission } from "@prisma/client";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/signin');
  }
}

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated())
    return next();
  return res.redirect('/profile');
}

export const checkAccess = (permissions: number | number[]) => {
  const permissionsArray: number[] = typeof permissions === 'number' ? [permissions] : permissions

  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.referer)
    if(checkUserPermissions(req.user.Role.Permissions, permissionsArray)) {
      next()
    } else {
      req.flash('message', 'No tiene permisos para acceder a esta función.')
      return res.redirect(req.headers.referer ?? `/profile`);
    }
  }
}

export const checkUserPermissions = (userPermissions: Permission[], requiredPermissions: number[]) =>
 userPermissions.find((up: Permission) => requiredPermissions.includes(up.id))
