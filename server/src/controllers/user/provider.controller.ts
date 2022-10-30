import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { providerSvcs } from '../../services';
import { IProv } from '../../interfaces';
import { getTokenData } from '../../utils';

class ProviderCtrl {
  /**
   * Create a provider.
   * @method post
   */
  public createProvider = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const newReg: IProv = req.body;
      // check if company_name already exists
      const existingCompanyName: QueryResult =
        await providerSvcs.getProviderByCompany(profile, newReg.company_name);
      if (existingCompanyName.rows.length !== 0) {
        return res.status(400).json('Provider already exists');
      }
      // check if tax_id already exists
      const existingTaxId: QueryResult = await providerSvcs.getProviderByTaxId(
        profile,
        newReg.tax_id
      );
      if (existingTaxId.rows.length !== 0 && newReg.tax_id.length > 1) {
        return res.status(400).json('tax_id already exists');
      }
      // starts
      await providerSvcs.createProvider(profile, newReg);
      return res
        .status(200)
        .json(`Provider ${newReg.company_name} successfully created`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all providers.
   * @method get
   */
  public getProviders = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const providersData: QueryResult = await providerSvcs.getProviders(
        profile
      );
      const providers = providersData.rows;
      return res.status(200).json(providers);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific provider.
   * @method get
   */
  public getProviderById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // get provider
      const providerData: QueryResult = await providerSvcs.getProviderById(
        profile,
        id
      );
      const provider = providerData.rows[0];
      return res.status(200).json(provider);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update a provider.
   * @method put
   */
  public updateProviderById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const providerData: IProv = req.body;
      // check if company_name already exists
      const existingCompanyName: QueryResult =
        await providerSvcs.getDifferentProviderByCompany(
          profile,
          id,
          providerData.company_name
        );
      if (
        existingCompanyName.rows.length !== 0 &&
        providerData.tax_id.length > 1
      ) {
        return res.status(400).json('Provider already exists');
      }
      // check if tax_id already exists
      const existingTaxId: QueryResult =
        await providerSvcs.getDifferentProviderByTaxId(
          profile,
          id,
          providerData.tax_id
        );
      if (providerData.tax_id.length > 3 && existingTaxId.rows.length !== 0) {
        return res.status(400).json('tax_id already exists');
      }
      await providerSvcs.updateProviderById(profile, id, providerData);
      return res.status(200).json(`Provider ${id} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable a provider.
   * @method delete
   */
  public disableProviderById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await providerSvcs.disableProviderById(profile, id);
      return res.status(200).json(`Provider ${id} successfully disabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable a provider.
   * @method patch
   */
  public enableProviderById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await providerSvcs.enableProviderById(profile, id);
      return res.status(200).json(`Provider ${id} successfully enable`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const providerCtrl = new ProviderCtrl();
