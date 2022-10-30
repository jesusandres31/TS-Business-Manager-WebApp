import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { encryptPassword } from '../../libs';
import { errorMsg, defaultPsswd } from '../../utils';
import { tenantSvcs, authSvcs } from '../../services';
import { ITen } from '../../interfaces';

class TenantCtrl {
  /**
   * Signup a tenant.
   * @method post
   */
  public signupTenant = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const newReg: ITen = req.body;
      // check if schema already exist
      const schema_name: QueryResult = await authSvcs.checkSchema(
        newReg.profile
      );
      if (schema_name.rows.length !== 0) {
        return res.status(400).json('Schema already Exists');
      }
      newReg.manager.manager_password = await encryptPassword(
        newReg.manager.manager_password
      );
      await tenantSvcs.createTenantSchema(newReg);
      return res
        .status(200)
        .json(
          `Profile for ${newReg.company_name} and its Manager account successfully created`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all tenants.
   * @param res return array of JSON.
   * @method get
   */
  public getTenants = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const tenantData: QueryResult = await tenantSvcs.getTenants();
      const tenants = tenantData.rows;
      return res.status(200).json(tenants);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific tenant by 'profile'.
   * @method get
   */
  public getTenantByPro = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      // get Profile info
      const profileData: QueryResult = await tenantSvcs.getTenantByPro(
        profileName
      );
      const profile = profileData.rows[0];
      // returns it
      return res.status(200).json(profile);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get users from a tenant.
   * @method get
   */
  public getTenantUsers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      // get Users from a profile (schema)
      const usersData: QueryResult = await tenantSvcs.getTenantsUsers(
        profileName
      );
      const usersInfo = usersData.rows;
      // returns it
      return res.status(200).json(usersInfo);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable a tenant.
   * @method delete
   */
  public disableTenantByPro = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      await tenantSvcs.disableTenantByPro(profileName);
      return res
        .status(200)
        .json(`Tenant ${profileName} successfully disabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable a tenant.
   * @method patch
   */
  public enableTenantByPro = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      await tenantSvcs.enableTenantByPro(profileName);
      return res.status(200).json(`Tenant ${profileName} successfully enabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable user from a tenant.
   * @method delete
   */
  public disableTenantUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const userId: number = parseInt(req.params.user);
      const profileName: string = req.params.profile;
      await tenantSvcs.disableTenantUser(profileName, userId);
      return res
        .status(200)
        .json(
          `User ${userId} from tenant ${profileName} successfully disabled`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable user from a tenant.
   * @method patch
   */
  public enableTenantUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const userId: number = parseInt(req.params.user);
      const profileName: string = req.params.profile;
      await tenantSvcs.enableTenantUser(profileName, userId);
      return res
        .status(200)
        .json(`User ${userId} from tenant ${profileName} successfully enabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update 'max_member' attribute of a tenant.
   * @method patch
   */
  public updateMaxMem = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      const tenantData: ITen = req.body;
      const newMaxMembers: number = tenantData.max_members;
      // chicking if operation is valid
      const usersInfo: QueryResult = await tenantSvcs.getTenantsUsers(
        profileName
      );
      const enabledUsers = usersInfo.rows.filter((user) => user.enabled);
      const numOfEnabledUsers = enabledUsers.length;
      if (numOfEnabledUsers > newMaxMembers) {
        const diff = numOfEnabledUsers - newMaxMembers;
        return res
          .status(400)
          .json(`Tenant needs to disable al teast ${diff} users`);
      }
      await tenantSvcs.updateMaxMem(profileName, newMaxMembers);
      return res
        .status(200)
        .json(
          `Number of memebers on ${profileName} profile, changed to ${newMaxMembers}`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Reset password of 'Manager' users from a tenant.
   * @method patch
   */
  public resetMgrPsswd = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      let password: string = JSON.parse(JSON.stringify(defaultPsswd));
      password = await encryptPassword(password);
      await tenantSvcs.resetMgrPsswd(profileName, password);
      return res
        .status(200)
        .json(
          `Managers password from profile ${profileName} successfully reseted`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Change 'schema' attribute of a tenant.
   * @method patch
   */
  public changeSchemaName = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const profileName: string = req.params.profile;
      const newName: string = req.body.profile;
      if (profileName === newName) {
        return res.status(400).json(`Send a new name`);
      }
      // check if schema already exist
      const schema_name: QueryResult = await authSvcs.checkSchema(newName);
      if (schema_name.rows.length !== 0) {
        return res.status(400).json('Schema already Exists');
      }
      await tenantSvcs.changeSchemaName(profileName, newName);
      return res
        .status(200)
        .json(
          `Schema name successfully changed from '${profileName}' to '${newName}'`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const tenantCtrl = new TenantCtrl();
