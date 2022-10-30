import { pool } from '../../database';
import { QueryResult } from 'pg';

class ProviderDetailSvcs {
  /**
   * Get all providers-detail.
   * @param profile schema name
   */
  public getProvidersDetail = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.providers_detail`);
  };

  /**
   * Get product's providers.
   * @param profile schema name
   * @param id provider id
   */
  public getProviderProductsById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.* FROM ${profile}.products AS p 
      INNER JOIN ${profile}.providers_detail AS pd ON p.id = pd.product_id
      WHERE pd.provider_id = $1`,
      [id]
    );
  };

  /**
   * Get product's providers.
   * @param profile schema name
   * @param id product id
   */
  public getProductProvidersById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.* FROM ${profile}.providers AS p 
      INNER JOIN ${profile}.providers_detail AS pd ON p.id = pd.provider_id
      WHERE pd.product_id = $1`,
      [id]
    );
  };

  /**
   * Remove a provider from a product.
   * @param profile schema name
   * @param id providers_detail id
   */
  public removeProviderById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(`DELETE FROM ${profile}.providers_detail WHERE id = $1`, [
      id,
    ]);
  };

  /**
   * Remove a product from a provider.
   * @param profile schema name
   * @param id providers_detail id
   */
  public removeProductById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(`DELETE FROM ${profile}.providers_detail WHERE id = $1`, [
      id,
    ]);
  };
}

export const providerDetailSvcs = new ProviderDetailSvcs();
