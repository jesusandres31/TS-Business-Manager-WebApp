import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { encryptPassword } from '../../libs';
import { errorMsg, defaultPsswd } from '../../utils';
import { authSvcs, userSvcs, extraSvcs } from '../../services';
import { IUser } from '../../interfaces';
import { getTokenData } from '../../utils';

class UserCtrl {
  /**
   * check if maxMembEnabled < maxMembAllowed
   */
  private isValidNumberOfUsers = async (profile: string) => {
    const profileInfo: QueryResult = await authSvcs.getProfile(profile);
    const maxMembAllowed: number = profileInfo.rows[0].max_members;
    const enabledUsers: QueryResult = await authSvcs.getEnabledUsers(profile);
    const maxMembEnabled: number = enabledUsers.rows.length;
    if (maxMembEnabled < maxMembAllowed) {
      return true;
    }
    return false;
  };

  /**
   * Signup an user.
   * @method post
   */
  public signupUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const newReg: IUser = req.body;
      // check if username already exists
      const existingUser: QueryResult = await authSvcs.getUserByUsername(
        profile,
        newReg.username
      );
      if (existingUser.rows.length !== 0) {
        return res.status(400).json('Username is already taken');
      }
      // check if email is being used
      const existingEmail: QueryResult = await userSvcs.getUserByEmail(
        profile,
        newReg.email
      );
      if (existingEmail.rows.length !== 0 && newReg.email.length > 1) {
        return res.status(400).json('Email is already used');
      }
      // check if role exists or it's dev
      const role: string = await authSvcs.getRoleName(newReg.role_id);
      if (!role) {
        return res.status(400).json('Role doesnt exist');
      }
      if (role === 'dev') {
        return res.status(400).json('Invalid role');
      }
      // check if isValidOperation
      const isValidOperation = await this.isValidNumberOfUsers(profile);
      if (!isValidOperation) {
        return res.status(400).json('You have reached the limit of users');
      }
      // starts
      newReg.password = await encryptPassword(newReg.password);
      await userSvcs.createUser(profile, newReg);
      return res
        .status(200)
        .json(`User ${newReg.username} successfully created`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all users.
   * @method get
   */
  public getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const usersData: QueryResult = await userSvcs.getUsers(profile);
      const users = usersData.rows;
      return res.status(200).json(users);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific users.
   * @method get
   */
  public getUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const userData: QueryResult = await userSvcs.getUserById(profile, id);
      const user = userData.rows[0];
      return res.status(200).json(user);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update an user.
   * @method put
   */
  public updateUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const userData: IUser = req.body;
      // check if email is being used
      const existingEmail: QueryResult = await userSvcs.getDifferentUserByEmail(
        profile,
        id,
        userData.email
      );
      if (existingEmail.rows.length !== 0 && userData.email.length > 1) {
        return res.status(400).json('Email is already used');
      }
      // stars
      await userSvcs.updateUserById(profile, id, userData);
      return res.status(200).json(`User ${id} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable an user.
   * @method delete
   */
  public disableUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // stars
      await userSvcs.disableUserById(profile, id);
      return res.status(200).json(`User ${id} successfully disabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable an user.
   * @method patch
   */
  public enableUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // check if isValidOperation
      const isValidOperation = await this.isValidNumberOfUsers(profile);
      if (!isValidOperation) {
        return res.status(400).json('You have reached the limit of users');
      }
      // stars
      await userSvcs.enableUserById(profile, id);
      return res.status(200).json(`User ${id} successfully enable`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Reset password of an user.
   * @method patch
   */
  public resetUserPsswd = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // starts
      let password: string = JSON.parse(JSON.stringify(defaultPsswd));
      password = await encryptPassword(password);
      await userSvcs.resetUserPsswd(profile, id, password);
      return res.status(200).json(`User ${id} password successfully reseted`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const userCtrl = new UserCtrl();
