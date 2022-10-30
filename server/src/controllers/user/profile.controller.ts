import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { profileSvcs } from '../../services';
import { IProf } from '../../interfaces';
import { getTokenData } from '../../utils';

class ProfileCtrl {
  /**
   * Get profile info.
   * @method get
   */
  public getProfile = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const profileData: QueryResult = await profileSvcs.getProfile(profile);
      const profileInfo = profileData.rows[0];
      return res.status(200).json(profileInfo);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update global config.
   * @method put
   */
  public updateGlobalConfig = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const profileData: IProf = req.body;
      await profileSvcs.updateGlobalConfig(profile, profileData);
      return res
        .status(200)
        .json(`Profile ${profileData.company_name} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update value config.
   * @method put
   */
  public updateValueConfig = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const profileData: IProf = req.body;
      await profileSvcs.updateValueConfig(profile, profileData);
      return res
        .status(200)
        .json(`Profile ${profileData.company_name} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const profileCtrl = new ProfileCtrl();
