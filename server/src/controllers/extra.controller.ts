import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../utils';
import { extraSvcs } from '../services';

class ExtraCtrl {
  /**
   * Get roles.
   * @method get
   */
  public getRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
      const rolesData: QueryResult = await extraSvcs.getRoles();
      const roles = rolesData.rows;
      return res.status(200).json(roles);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get payment types.
   * @method get
   */
  public getPaymentTypes = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const paymentTypesData: QueryResult = await extraSvcs.getPaymentTypes();
      const paymentTypes = paymentTypesData.rows;
      return res.status(200).json(paymentTypes);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get product types.
   * @method get
   */
  public getProductTypes = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const productTypesData: QueryResult = await extraSvcs.getProductTypes();
      const productTypes = productTypesData.rows;
      return res.status(200).json(productTypes);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get sale types.
   * @method get
   */
  public getSaleTypes = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const saleTypesData: QueryResult = await extraSvcs.getSaleTypes();
      const saleTypes = saleTypesData.rows;
      return res.status(200).json(saleTypes);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all languages.
   * @method get
   */
  public getLanguages = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const languagesData: QueryResult = await extraSvcs.getLanguages();
      const languages = languagesData.rows;
      return res.status(200).json(languages);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific language.
   * @method get
   */
  public getLanguageByCod = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const langCode: string = req.params.lang;
      const languageData: QueryResult = await extraSvcs.getLanguageByCod(
        langCode
      );
      const language = languageData.rows;
      return res.status(200).json(language);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const extraCtrl = new ExtraCtrl();
