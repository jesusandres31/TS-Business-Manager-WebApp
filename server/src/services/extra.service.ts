import { pool } from '../database';
import { QueryResult } from 'pg';

class ExtraSvcs {
  /**
   * Get roles.
   */
  public getRoles = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM roles`);
  };

  /**
   * Get payment types
   */
  public getPaymentTypes = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM payment_types`);
  };

  /**
   * Get product types.
   */
  public getProductTypes = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM product_types`);
  };

  /**
   * Get sale types.
   */
  public getSaleTypes = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM sale_types`);
  };

  /**
   * Get all languages.
   */
  public getLanguages = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM languages`);
  };

  /**
   * Get a specific language.
   * @param cod language cod
   */
  public getLanguageByCod = async (langCode: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM languages WHERE iso_code = $1`, [
      langCode,
    ]);
  };
}

export const extraSvcs = new ExtraSvcs();
