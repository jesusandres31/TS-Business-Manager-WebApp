import { Request, Response, NextFunction } from 'express';
import { errorMsg } from '../utils';

/**
 * Check role (dev, manager, admin, seller, supervisor).
 */
export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // set role name from payload returned by passport.ts
      const payload: any = JSON.parse(JSON.stringify(req.authInfo));
      const roleName: string = payload.role;
      if (roles.indexOf(roleName) >= 0) {
        next();
      } else {
        return res.status(401).json('Role unauthorized');
      }
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
};
