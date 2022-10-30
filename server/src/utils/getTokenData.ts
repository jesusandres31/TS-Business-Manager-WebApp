import { Request } from 'express';

/**
 * Get Profile, Role, and Sub (user id), form Token.
 */
export const getTokenData = (req: Request) => {
  const payload: any = JSON.parse(JSON.stringify(req.authInfo));

  const profile: string = payload.profile;
  const role: string = payload.role;
  const sub: number = payload.sub;

  return { profile, role, sub };
};
