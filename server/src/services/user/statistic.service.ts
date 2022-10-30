import { pool } from '../../database';
import { QueryResult } from 'pg';

class StatisticSvcs {
  /**
   * CLIENTS STATS #######################################################
   */

  /**
   * Get clients by invoices.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getClientsByInvoices = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT c.company_name as "client", count(rm.id) as "invoices"
        FROM ${profile}.clients AS c
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.client_id = c.id
        WHERE c.enabled = true 
        AND rm.created >= $1 AND rm.created <= $2
      GROUP BY c.company_name
      ORDER BY count(rm.id) asc`,
      [dateFrom, dateTo]
    );
  };

  /**
   * Get total sold to client.
   * @param profile schema name
   * @param id client id
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getProductsSoldByClient = async (
    profile: string,
    id: number,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.name as "product", count(rd.product_id) as "quantity"
        FROM ${profile}.products AS p 
        INNER JOIN ${profile}.report_detail AS rd
        ON p.id = rd.product_id 
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.id = rd.report_master_id
        WHERE p.enabled = true 
        AND rm.client_id = $1
        AND rm.created >= $2 AND rm.created <= $3
      GROUP BY p.name, rd.product_id`,
      [id, dateFrom, dateTo]
    );
  };

  /**
   * Get total sold to clients.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getTotalSoldToClients = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT c.company_name as "client", sum(rm.total) as "total_sold"
        FROM ${profile}.clients AS c
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.client_id = c.id
        WHERE c.enabled = true 
        AND rm.created >= $1 AND rm.created <= $2
      GROUP BY c.company_name
      ORDER BY sum(rm.total) asc`,
      [dateFrom, dateTo]
    );
  };

  /**
   * PROVIDERS STATS #######################################################
   */

  /**
   * Get products by providers.
   * @param profile schema name
   */
  public getProductsByProviders = async (
    profile: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.company_name as "provider", count(pd.id) as "products"
        FROM ${profile}.providers AS p
        INNER JOIN ${profile}.providers_detail AS pd 
        ON pd.provider_id = p.id
        WHERE p.enabled = true 
      GROUP BY p.company_name
      ORDER BY count(pd.id) asc`
    );
  };

  /**
   * Get total sold by providers.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getTotalSoldByProviders = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.company_name as "provider", count(rd.id) as "quantity"
        FROM ${profile}.providers AS p 
        INNER JOIN ${profile}.providers_detail AS pd
        ON p.id = pd.provider_id  
        INNER JOIN ${profile}.report_detail AS rd 
        ON rd.product_id = pd.product_id
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.id = rd.report_master_id
        WHERE p.enabled = true 
        AND rm.created >= $1 AND rm.created <= $2
      GROUP BY p.company_name
      ORDER BY count(rd.id) asc`,
      [dateFrom, dateTo]
    );
  };

  /**
   * Get products sold by providers.
   * @param profile schema name
   * @param id client id
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getProductsSoldByProvider = async (
    profile: string,
    id: number,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.name as "product", count(rd.product_id) as "quantity"
        FROM ${profile}.products AS p 
        INNER JOIN ${profile}.report_detail AS rd
        ON p.id = rd.product_id 
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.id = rd.report_master_id
        INNER JOIN ${profile}.providers_detail AS pd 
        ON pd.product_id = p.id
        WHERE p.enabled = true 
        AND pd.provider_id = $1
        AND rm.created >= $2 AND rm.created <= $3
      GROUP BY p.name, rd.product_id`,
      [id, dateFrom, dateTo]
    );
  };

  /**
   * PRODUCTS STATS #######################################################
   */

  /**
   * Get products by invoice.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getProductsByInvoice = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT p.name as "product", count(rd.id) as "invoices"
        FROM ${profile}.products AS p
        INNER JOIN ${profile}.report_detail AS rd 
        ON rd.product_id = p.id
        INNER JOIN ${profile}.report_master AS rm 
        ON rm.id = rd.report_master_id
        WHERE p.enabled = true 
        AND rm.created >= $1 AND rm.created <= $2
      GROUP BY p.name
      ORDER BY count(rm.id) asc`,
      [dateFrom, dateTo]
    );
  };

  /**
   * Get clients purchases by product.
   * @param profile schema name
   * @param id client id
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getClientsPurchasesByProduct = async (
    profile: string,
    id: number,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT c.company_name as "client", count(rm.client_id) as "quantity"
        FROM ${profile}.clients AS c 
        INNER JOIN ${profile}.report_master AS rm
        ON c.id = rm.client_id 
        INNER JOIN ${profile}.report_detail AS rd 
        ON rd.report_master_id = rm.id
        WHERE c.enabled = true 
        AND rd.product_id = $1
        AND rm.created >= $2 AND rm.created <= $3
      GROUP BY c.company_name, rm.client_id`,
      [id, dateFrom, dateTo]
    );
  };

  /**
   * PROFITS STATS #######################################################
   */

  /**
   * Get gross profits.
   * @param profile schema name
   * @param dateFrom date from
   * @param dateTo date to
   */
  public getGrossProfits = async (
    profile: string,
    dateFrom: string,
    dateTo: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT sum(rm.total) as "total"
        FROM ${profile}.report_master AS rm
        WHERE rm.created >= $1 AND rm.created <= $2`,
      [dateFrom, dateTo]
    );
  };

  /**
   * Get total debts.
   * @param profile schema name
   */
  public getTotalDebts = async (profile: string): Promise<QueryResult> => {
    return await pool.query(
      `SELECT sum(c.debt) as "total"
      FROM ${profile}.clients AS c`
    );
  };
}

export const statisticSvcs = new StatisticSvcs();
