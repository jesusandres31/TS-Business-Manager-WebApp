import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { providerDetailSvcs } from '../../services';
import { getTokenData } from '../../utils';

class ProviderDetailCtrl {
  /**
   * Get all providers-detail.
   * @method get
   */
  public getProvidersDetail = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const providersDetailData: QueryResult = await providerDetailSvcs.getProvidersDetail(
        profile
      );
      const providersDetail = providersDetailData.rows;
      return res.status(200).json(providersDetail);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get provider products.
   * @method get
   */
  public getProviderProductsById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // get its products
      const productsData: QueryResult = await providerDetailSvcs.getProviderProductsById(
        profile,
        id
      );
      const products = productsData.rows;
      return res.status(200).json(products);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get product providers.
   * @method get
   */
  public getProductProvidersById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // get its providers
      const providersData: QueryResult = await providerDetailSvcs.getProductProvidersById(
        profile,
        id
      );
      const providers = providersData.rows;
      return res.status(200).json(providers);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Remove a provider from a product.
   * @method delete
   */
  public removeProviderById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await providerDetailSvcs.removeProviderById(profile, id);
      return res
        .status(200)
        .json(`Provider successfully removed from this product`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Remove a product from a provider.
   * @method delete
   */
  public removeProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await providerDetailSvcs.removeProductById(profile, id);
      return res
        .status(200)
        .json(`Product successfully removed from this provider`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}
export const providerDetailCtrl = new ProviderDetailCtrl();
