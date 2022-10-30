import { Request, Response, NextFunction } from 'express';

/**
 * If subdomain is 'dev', it will change the name to 'public'.
 * Because it's the name of the Schema where 'dev' account is created.
 */
/* export function isDev(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.profile) {
    return res.status(400).json('Send http header');
  }
  const profile: string = JSON.parse(JSON.stringify(req.headers.profile));
  if (profile == 'dev') {
    req.headers.profile = 'public';
  }
  return next();
}
 */

const isDev = false;
export { isDev };
