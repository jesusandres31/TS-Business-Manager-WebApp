import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { createToken, encryptPassword } from '../libs';
import { errorMsg, defaultPsswd } from '../utils';
import { authSvcs } from '../services';
import { IAuth } from '../interfaces';
import { getTokenData } from '../utils';

class AuthCtrl {
  /**
   * Signin for any role.
   * @method post
   */
  public signin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IAuth = req.body;
      // Profile info ...
      // 'public' schema doesn't have a 'profile' table
      if (user.profile !== 'public') {
        // check if schema exists
        const schema_name: QueryResult = await authSvcs.checkSchema(
          user.profile
        );
        if (schema_name.rows.length === 0) {
          return res.status(400).json("Profile doesn't exists");
        }
        // check if profile is enabled
        const profileInfo: QueryResult = await authSvcs.getProfile(
          user.profile
        );
        if (!profileInfo.rows[0].enabled) {
          return res.status(400).json(`Profile disabled`);
        }
      }
      // User info ...
      const userData: QueryResult = await authSvcs.getUserByUsername(
        user.profile,
        user.username
      );
      // check if user exists
      if (userData.rows.length === 0) {
        return res.status(400).json("User doesn't exists");
      }
      // check if user is enabled
      if (userData.rows[0].enabled === false) {
        return res.status(400).json('User is not enabled');
      }
      // Starts ...
      const profile: string = user.profile;
      const id: number = userData.rows[0].id;
      const role: string = await authSvcs.getRoleName(userData.rows[0].role_id);
      const isMatch: boolean = await authSvcs.validatePasswd(
        profile,
        user.username,
        user.password
      );
      const newTokens = await createToken(id, profile, role);
      if (isMatch) {
        return res.status(200).json({
          id,
          role,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        });
      }
      return res.status(400).json('Username or password is wrong');
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Refresh token.
   * @method post
   */
  public refresh = async (req: Request, res: Response): Promise<Response> => {
    const { profile, role, sub } = getTokenData(req)!;
    const id: number = sub;
    // Profile info ...
    // 'public' schema doesn't have a 'profile' table
    if (profile !== 'public') {
      // check if profile is enabled
      const profileInfo: QueryResult = await authSvcs.getProfile(profile);
      if (!profileInfo.rows[0].enabled) {
        return res.status(400).json(`Profile disabled`);
      }
    }
    // User info ...
    const userData: QueryResult = await authSvcs.getUserById(profile, id);
    // check if user is enabled
    if (userData.rows[0].enabled === false) {
      return res.status(400).json('User is not enabled');
    }
    // Starts ...
    const newTokens = await createToken(id, profile, role);
    return res.status(200).json({
      id,
      role,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    });
  };

  /**
   * Manager password forget for tenants.
   * Not ready.
   * @method patch
   */
  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      return res.status(200);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Manager password forgotten confirmation for tenants.
   * Not ready.
   * @method patch
   */
  public resetPassword = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      return res.status(200);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const authCtrl = new AuthCtrl();
