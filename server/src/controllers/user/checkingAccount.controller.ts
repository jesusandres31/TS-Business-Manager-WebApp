import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { checkingAccSvcs } from '../../services';
import { ICheck } from '../../interfaces';
import { getTokenData } from '../../utils';

class CheckingAccCtrl {
  /**
   * Get a checking account by client.
   * @method get
   */
  public getCheckingAccByClient = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const clientId: number = parseInt(req.params.clientId);
      const pageNumber: number = parseInt(req.params.pageNumber);
      const itemsPerPage: number = parseInt(req.params.itemsPerPage);
      const checkingAccData: QueryResult =
        await checkingAccSvcs.getCheckingAccByClient(
          profile,
          clientId,
          pageNumber,
          itemsPerPage
        );
      const checkingAcc = checkingAccData.rows;
      return res.status(200).json(checkingAcc);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const checkingAccCtrl = new CheckingAccCtrl();
