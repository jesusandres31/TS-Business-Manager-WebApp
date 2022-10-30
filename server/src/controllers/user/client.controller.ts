import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { clientSvcs } from '../../services';
import { ICli, IUpCliDebt } from '../../interfaces';
import { getTokenData } from '../../utils';

class ClientCtrl {
  /**
   * Create a client.
   * @method post
   */
  public createClient = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const newReg: ICli = req.body;
      // check if company_name already exists
      const existingCompany: QueryResult = await clientSvcs.getClientByCompany(
        profile,
        newReg.company_name
      );
      if (existingCompany.rows.length !== 0) {
        return res.status(400).json('Client already exists');
      }
      // check if tax_id already exists
      const existingTaxId: QueryResult = await clientSvcs.getClientByTaxId(
        profile,
        newReg.tax_id
      );
      if (existingTaxId.rows.length !== 0 && newReg.tax_id.length > 1) {
        return res.status(400).json('tax_id already exists');
      }
      // starts
      await clientSvcs.createClient(profile, newReg);
      return res
        .status(200)
        .json(`Client ${newReg.surname}, ${newReg.name} successfully created`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all clients.
   * @method get
   */
  public getClients = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const clientsData: QueryResult = await clientSvcs.getClients(profile);
      const clients = clientsData.rows;
      return res.status(200).json(clients);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific client.
   * @method get
   */
  public getClientById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const clientData: QueryResult = await clientSvcs.getClientById(
        profile,
        id
      );
      const client = clientData.rows[0];
      return res.status(200).json(client);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update a client.
   * @method put
   */
  public updateClientById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const clientData: ICli = req.body;
      // check if company_name already exists
      const existingCompany: QueryResult =
        await clientSvcs.getDifferentClientByCompany(
          profile,
          id,
          clientData.company_name
        );
      if (existingCompany.rows.length !== 0) {
        return res.status(400).json('Client already exists');
      }
      // check if tax_id already exists
      const existingTaxId: QueryResult =
        await clientSvcs.getDifferentClientByTaxId(
          profile,
          id,
          clientData.tax_id
        );
      if (existingTaxId.rows.length !== 0 && clientData.tax_id.length > 1) {
        return res.status(400).json('tax_id already exists');
      }
      // starts
      await clientSvcs.updateClientById(profile, id, clientData);
      return res.status(200).json(`Client ${id} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update client debt.
   * @method put
   */
  public updateClientDebt = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const updateDebtData: IUpCliDebt = req.body;
      await clientSvcs.updateClientDebt(profile, updateDebtData);
      return res
        .status(200)
        .json(
          `Debt of client ${updateDebtData.client_id} successfully updated`
        );
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable a client.
   * @method delete
   */
  public disableClientById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await clientSvcs.disableClientById(profile, id);
      return res.status(200).json(`Client ${id} successfully disabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable a client.
   * @method patch
   */
  public enableClientById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await clientSvcs.enableClientById(profile, id);
      return res.status(200).json(`Client ${id} successfully enable`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const clientCtrl = new ClientCtrl();
