import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { errorMsg } from '../../utils';
import { productSvcs } from '../../services';
import { IProd, IProvDet } from '../../interfaces';
import { getTokenData } from '../../utils';

class ProductCtrl {
  /**
   * Create a product.
   * @method post
   */
  public createProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const newReg: IProd = req.body;
      // check if provider_details is an array
      if (!Array.isArray(newReg.provider_details)) {
        return res.status(400).json('Provider_details needs to be an array');
      }
      // check if product already exists
      const existingProduct: QueryResult = await productSvcs.getProductByName(
        profile,
        newReg.name
      );
      if (existingProduct.rows.length !== 0) {
        return res.status(400).json(`Product already exists`);
      }
      // starts
      await productSvcs.createProduct(profile, newReg);
      return res
        .status(200)
        .json(`Product ${newReg.name} successfully created`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get all products.
   * @method get
   */
  public getProducts = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const productsData: QueryResult = await productSvcs.getProducts(profile);
      const products = productsData.rows;
      return res.status(200).json(products);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Get a specific product.
   * @method get
   */
  public getProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      // get product
      const productData: QueryResult = await productSvcs.getProductById(
        profile,
        id
      );
      const product: IProd = productData.rows[0];
      if (product) {
        // get provider details
        const providerDetailsData: QueryResult =
          await productSvcs.getProductProvidersById(profile, id);
        const providerDetails: IProvDet[] = providerDetailsData.rows;
        // joining
        product.provider_details = providerDetails;
      }
      return res.status(200).json(product);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update a product.
   * @method put
   */
  public updateProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const productData: IProd = req.body;
      // check if product already exists
      const existingProduct: QueryResult =
        await productSvcs.getDifferentProductByName(
          profile,
          id,
          productData.name
        );
      if (existingProduct.rows.length !== 0) {
        return res.status(400).json('Product already exists');
      }
      await productSvcs.updateProductById(profile, id, productData);
      return res.status(200).json(`Product ${id} successfully updated`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Disable a product.
   * @method delete
   */
  public disableProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await productSvcs.disableProductById(profile, id);
      return res.status(200).json(`Product ${id} successfully disabled`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Enable a product.
   * @method patch
   */
  public enableProductById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      await productSvcs.enableProductById(profile, id);
      return res.status(200).json(`Product ${id} successfully enable`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update product's stock.
   * @method patch
   */
  public updateProductStock = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const productData: IProd = req.body;
      const stock: number = productData.stock;
      await productSvcs.updateProductStock(profile, id, stock);
      return res
        .status(200)
        .json(`Product's ${id} stock, successfully updated to ${stock}`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };

  /**
   * Update product's Sale Price.
   * @method patch
   */
  public updateProductSalePrice = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { profile } = getTokenData(req)!;
      const id: number = parseInt(req.params.id);
      const productData: IProd = req.body;
      const price: number = productData.sale_price;
      await productSvcs.updateProductSalePrice(profile, id, price);
      return res
        .status(200)
        .json(`Product's ${id} sale price, successfully updated to ${price}`);
    } catch (e) {
      return errorMsg.serverError(res, e);
    }
  };
}

export const productCtrl = new ProductCtrl();
