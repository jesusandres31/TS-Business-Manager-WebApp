import { pool } from '../../database';
import { QueryResult } from 'pg';
import { IProd, IProvDet } from '../../interfaces';

class ProductSvcs {
  /**
   * Get product by name.
   * @param profile schema name
   * @param name product name
   */
  public getProductByName = async (
    profile: string,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.products WHERE name = $1`,
      [name]
    );
  };

  /**
   * Get a different product by name.
   * @param profile schema name
   * @param id product id
   * @param name product name
   */
  public getDifferentProductByName = async (
    profile: string,
    id: number,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.products WHERE id != $1 AND name = $2`,
      [id, name]
    );
  };

  /**
   * Create a Product.
   * @param profile schema name
   * @param newReg product data
   */
  public createProduct = async (
    profile: string,
    newReg: IProd
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Creating a Product.
      const productQuery = `INSERT INTO products (
        product_type_id,
        name,
        stock,
        sale_price,
        barcode,
        min_stock,
        enabled
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
      const productData = [
        newReg.product_type_id,
        newReg.name,
        newReg.stock,
        newReg.sale_price,
        newReg.barcode,
        newReg.min_stock,
        true,
      ];
      // insert the product and return its Id
      const respones: QueryResult = await client.query(
        productQuery,
        productData
      );
      const productId: number = respones.rows[0].id;

      // Creating a providers_detail register.
      const providers: Array<IProvDet> = newReg.provider_details;
      // starts iteration for each provider_id given
      providers.forEach(async (detail) => {
        const providerDetailQuery = `INSERT INTO providers_detail ( 
            product_id,
            provider_id,
            purchase_price
          ) VALUES ($1, $2, $3)`;
        const providerDetailData = [
          productId,
          detail.provider_id,
          detail.purchase_price,
        ];
        await client.query(providerDetailQuery, providerDetailData);
      });

      // End transaction.
      await client.query('COMMIT');
      await client.query(`SET search_path TO public;`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };

  /**
   * Get all products.
   * @param profile schema name
   */
  public getProducts = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.products`);
  };

  /**
   * Get a specific product.
   * @param profile schema name
   * @param id product id
   */
  public getProductById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.products WHERE id = $1`, [
      id,
    ]);
  };

  /**
   * Get product providers by product id.
   * @param profile schema name
   * @param id product id
   */
  public getProductProvidersById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT provider_id, purchase_price FROM ${profile}.providers_detail WHERE product_id = $1`,
      [id]
    );
  };

  /**
   * Update a product.
   * @param profile schema name
   * @param id product id
   * @param productData product data
   */
  public updateProductById = async (
    profile: string,
    id: number,
    productData: IProd
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Update a Product.
      const productQuery = `UPDATE products SET (
        product_type_id,
        name,
        stock,
        sale_price,
        barcode,
        min_stock
      ) = ( $1, $2, $3, $4, $5, $6) WHERE id = $7 RETURNING id`;
      const productDataToUpdate = [
        productData.product_type_id,
        productData.name,
        productData.stock,
        productData.sale_price,
        productData.barcode,
        productData.min_stock,
        id,
      ];
      // update the product and return its Id
      const respones: QueryResult = await client.query(
        productQuery,
        productDataToUpdate
      );
      const productId: number = respones.rows[0].id;

      // Deleting old 'providers_detail' registers.
      await client.query(`DELETE FROM providers_detail WHERE product_id = $1`, [
        productId,
      ]);

      // Creating a new providers_detail register.
      const providers: Array<IProvDet> = productData.provider_details;
      // starts iteration for each provider_id given
      providers.forEach(async (detail) => {
        const providerDetailQuery = `INSERT INTO providers_detail ( 
            product_id,
            provider_id,
            purchase_price
          ) VALUES ($1, $2, $3)`;
        const providerDetailData = [
          productId,
          detail.provider_id,
          detail.purchase_price,
        ];
        await client.query(providerDetailQuery, providerDetailData);
      });

      // End transaction.
      await client.query('COMMIT');
      await client.query(`SET search_path TO public;`);
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };

  /**
   * Disable a product.
   * @param profile schema name
   * @param id product id
   */
  public disableProductById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.products SET enabled = 'false' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Enable a product.
   * @param profile schema name
   * @param id product id
   */
  public enableProductById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.products SET enabled = 'true' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Update product's stock.
   * @param profile schema name
   * @param id product id
   * @param stock product stock
   */
  public updateProductStock = async (
    profile: string,
    id: number,
    stock: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.products SET stock = $1 WHERE id = $2`,
      [stock, id]
    );
  };

  /**
   * Update product's Sale Price.
   * @param profile schema name
   * @param id product id
   * @param price product sale price
   */
  public updateProductSalePrice = async (
    profile: string,
    id: number,
    price: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.products SET sale_price = $1 WHERE id = $2`,
      [price, id]
    );
  };
}

export const productSvcs = new ProductSvcs();
