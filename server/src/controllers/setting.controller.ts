import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { encryptPassword } from '../libs';
import { errorMsg } from '../utils';
import { authSvcs, settingSvcs } from '../services';
import { ISet } from '../interfaces';
import { getTokenData } from '../utils';

class SettingCtrl {
  /**
   * Get my user info.
   * @method get
   */
  public getMyUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { sub } = getTokenData(req)!;
      // get my user if getSubId was success
      if (typeof sub === 'number') {
        const userData: QueryResult = await authSvcs.getUserById(profile, sub);
        const user = userData.rows[0];
        return res.status(200).json(user);
      }
      return res.status(401).json('Unauthorized');
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Change password for any role.
   * @method put
   */
  public changePsswd = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { sub } = getTokenData(req)!;
      const settings: ISet = req.body;
      // change password if getSubId was success
      if (typeof sub === 'number') {
        // starts
        let newPassword: string = settings.new_user_or_psswd;
        const isMatch: boolean = await authSvcs.validatePasswd(
          profile,
          settings.username,
          settings.password
        );
        if (isMatch) {
          // changing password
          newPassword = await encryptPassword(settings.new_user_or_psswd);
          await settingSvcs.changePsswd(profile, sub, newPassword);
          return res.status(200).json('Password changed successfully');
        }
        return res.status(400).json('Password is wrong');
      }
      return res.status(401).json('Unauthorized');
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Change username for any role.
   * @method put
   */
  public changeUsername = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { sub } = getTokenData(req)!;
      const settings: ISet = req.body;
      // change username if getSubId was success
      if (typeof sub === 'number') {
        const userData: QueryResult = await authSvcs.getUserById(profile, sub);
        // check if username is a new one
        if (userData.rows[0].username === settings.new_user_or_psswd) {
          return res.status(400).json('Send new username');
        }
        const existsUser: QueryResult = await authSvcs.getUserByUsername(
          profile,
          settings.new_user_or_psswd
        );
        if (existsUser.rows.length !== 0) {
          return res.status(400).json('Username is already taken');
        }
        // starts
        const newUsername: string = settings.new_user_or_psswd;
        const isMatch: boolean = await authSvcs.validatePasswd(
          profile,
          settings.username,
          settings.password
        );
        if (isMatch) {
          // changing username
          await settingSvcs.changeUsername(profile, sub, newUsername);
          return res.status(200).json('Username changed successfully');
        }
        return res.status(400).json('Password is wrong');
      }
      return res.status(401).json('Unauthorized');
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const settingCtrl = new SettingCtrl();
