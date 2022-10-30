import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import path from 'path';
import fs from 'fs';
import { encryptPassword } from '../libs';
import { errorMsg } from '../utils';
import { mainSvcs } from '../services';
import { IDev } from '../interfaces';

class MainCtrl {
  /**
   * API greet.
   * @method get
   */
  public index(req: Request, res: Response): Response {
    return res.status(200).json('Hello from the server');
  }

  /**
   * Check API status.
   * @method get
   */
  public processHealthCheck(req: Request, res: Response): Response {
    return res.status(200).send({ status: 'ok' });
  }

  /**
   * Initial Setup:
   * Create Public Shema and Dev account.
   * Used only first time the app is deployed.
   * @method get
   */
  public initialSetups = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      // trying to create the Public Schema in DataBase
      const response: QueryResult = await mainSvcs.doesTableExist();
      const table = response.rows[0].to_regclass;

      if (table !== null) {
        return res.status(400).json(`Public Scheme already created`);
      }
      await mainSvcs.createPublicSchema();
      // if Public Schema was successfully created, it'll try to create the Dev account
      const name: QueryResult = await mainSvcs.getSomeUser();
      if (name.rows.length !== 0) {
        return res.status(400).json('Dev already created');
      }
      const jsonPartialPath = '/private/dev-account.json';
      const devAccountPath = path.join(
        __dirname,
        '../../../' + jsonPartialPath
      );
      const rawDevData = fs.readFileSync(devAccountPath).toString();
      const jsonDevData = JSON.parse(rawDevData);
      const devData: IDev = jsonDevData[0];
      devData.password = await encryptPassword(devData.password);
      await mainSvcs.signupDev(devData);
      // application initialization process finished successfully
      return res
        .status(200)
        .json(`Public Schema and Dev Account successfully created`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const mainCtrl = new MainCtrl();
