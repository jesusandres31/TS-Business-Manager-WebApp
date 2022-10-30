import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { statisticSvcs } from '../../services';
import { getTokenData } from '../../utils';

class StatisticCtrl {
  /**
   * CLIENTS STATS #######################################################
   */

  /**
   * Get clients by invoices.
   * @method post
   */
  public getClientsByInvoices = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const clientsByInvoicesData: QueryResult =
        await statisticSvcs.getClientsByInvoices(profile, dateFrom, dateTo);
      const clientsByInvoices = clientsByInvoicesData.rows;
      return res.status(200).json(clientsByInvoices);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get total sold to client.
   * @method post
   */
  public getProductsSoldByClient = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const id: number = parseInt(req.params.id);
      const productsSoldByClientData: QueryResult =
        await statisticSvcs.getProductsSoldByClient(
          profile,
          id,
          dateFrom,
          dateTo
        );
      const productsSoldByClient = productsSoldByClientData.rows;
      return res.status(200).json(productsSoldByClient);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get total sold to clients.
   * @method post
   */
  public getTotalSoldToClients = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const totalSoldToClientsData: QueryResult =
        await statisticSvcs.getTotalSoldToClients(profile, dateFrom, dateTo);
      const totalSoldToClients = totalSoldToClientsData.rows;
      return res.status(200).json(totalSoldToClients);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * PROVIDERS STATS #######################################################
   */

  /**
   * Get products by providers.
   * @method get
   */
  public getProductsByProviders = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const productsByProvidersData: QueryResult =
        await statisticSvcs.getProductsByProviders(profile);
      const productsByProviders = productsByProvidersData.rows;
      return res.status(200).json(productsByProviders);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get total sold by providers.
   * @method post
   */
  public getTotalSoldByProviders = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const totalSoldByProvidersData: QueryResult =
        await statisticSvcs.getTotalSoldByProviders(profile, dateFrom, dateTo);
      const totalSoldByProviders = totalSoldByProvidersData.rows;
      return res.status(200).json(totalSoldByProviders);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get products sold by providers.
   * @method post
   */
  public getProductsSoldByProvider = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const id: number = parseInt(req.params.id);
      const productsSoldByProviderData: QueryResult =
        await statisticSvcs.getProductsSoldByProvider(
          profile,
          id,
          dateFrom,
          dateTo
        );
      const productsSoldByProvider = productsSoldByProviderData.rows;
      return res.status(200).json(productsSoldByProvider);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * PRODUCTS STATS #######################################################
   */

  /**
   * Get products by invoice.
   * @method post
   */
  public getProductsByInvoice = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const productsByInvoiceData: QueryResult =
        await statisticSvcs.getProductsByInvoice(profile, dateFrom, dateTo);
      const productsByInvoice = productsByInvoiceData.rows;
      return res.status(200).json(productsByInvoice);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get clients purchases by product.
   * @method post
   */
  public getClientsPurchasesByProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const id: number = parseInt(req.params.id);
      const clientsPurchasesByProductData: QueryResult =
        await statisticSvcs.getClientsPurchasesByProduct(
          profile,
          id,
          dateFrom,
          dateTo
        );
      const clientsPurchasesByProduct = clientsPurchasesByProductData.rows;
      return res.status(200).json(clientsPurchasesByProduct);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * PROFITS STATS #######################################################
   */

  /**
   * Get gross profits.
   * @method post
   */
  public getGrossProfits = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const { dateFrom, dateTo } = req.body;
      const grossProfitsData: QueryResult = await statisticSvcs.getGrossProfits(
        profile,
        dateFrom,
        dateTo
      );
      const grossProfits = grossProfitsData.rows[0];
      return res.status(200).json(grossProfits);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get total debts.
   * @method get
   */
  public getTotalDebts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const netProfitsData: QueryResult = await statisticSvcs.getTotalDebts(
        profile
      );
      const netProfits = netProfitsData.rows[0];
      return res.status(200).json(netProfits);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const statisticCtrl = new StatisticCtrl();
