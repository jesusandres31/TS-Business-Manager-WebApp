import { pool } from '../../database';
import { QueryResult } from 'pg';
import { IProv } from '../../interfaces';

class ProviderSvcs {
  /**
   * Get provider by company_name.
   * @param profile schema name
   * @param name provider name
   */
  public getProviderByCompany = async (
    profile: string,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.providers WHERE company_name = $1`,
      [name]
    );
  };

  /**
   * Get provider by tax_id.
   * @param profile schema name
   * @param tax_id tax id
   */
  public getProviderByTaxId = async (
    profile: string,
    tax_id: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.providers WHERE tax_id = $1`,
      [tax_id]
    );
  };

  /**
   * Get a different provider by company_name.
   * @param profile schema name
   * @param id provider id
   * @param name provider name
   */
  public getDifferentProviderByCompany = async (
    profile: string,
    id: number,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.providers WHERE id != $1 AND company_name = $2`,
      [id, name]
    );
  };

  /**
   * Get a different provider by tax_id.
   * @param profile schema name
   * @param id provider id
   * @param tax_id tax id
   */
  public getDifferentProviderByTaxId = async (
    profile: string,
    id: number,
    tax_id: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.providers WHERE id != $1 AND tax_id = $2`,
      [id, tax_id]
    );
  };

  /**
   * Create a Provider.
   * @param profile schema name
   * @param newReg provider data
   */
  public createProvider = async (
    profile: string,
    newReg: IProv
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Creating a Provider.
      const providerQuery = `INSERT INTO providers (
        locality,
        company_name,
        tax_id,
        name,
        surname,
        email,
        phone,
        address,
        enabled
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const providerData = [
        newReg.locality,
        newReg.company_name,
        newReg.tax_id,
        newReg.name,
        newReg.surname,
        newReg.email,
        newReg.phone,
        newReg.address,
        true,
      ];
      await client.query(providerQuery, providerData);

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
   * Get all providers.
   * @param profile schema name
   */
  public getProviders = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.providers`);
  };

  /**
   * Get a specific provider.
   * @param profile schema name
   * @param id provider id
   */
  public getProviderById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.providers WHERE id = $1`,
      [id]
    );
  };

  /**
   * Update a provider.
   * @param profile schema name
   * @param id provider id
   * @param providerData provider data
   */
  public updateProviderById = async (
    profile: string,
    id: number,
    providerData: IProv
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.providers SET (
      locality,
      company_name,
      tax_id,
      name,
      surname,
      email,
      phone,
      address
    ) = ( $1, $2, $3, $4, $5, $6, $7, $8) WHERE id = $9`,
      [
        providerData.locality,
        providerData.company_name,
        providerData.tax_id,
        providerData.name,
        providerData.surname,
        providerData.email,
        providerData.phone,
        providerData.address,
        id,
      ]
    );
  };

  /**
   * Disable a provider and remove provider
   * registers from providers_detail.
   * @param profile schema name
   * @param id provider id
   */
  public disableProviderById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Disable a Provider.
      const providerQuery = `UPDATE providers SET enabled = 'false' WHERE id = $1`;
      const providerData = [id];
      await client.query(providerQuery, providerData);

      // Remove register from providers_detail.
      const providersDetailQuery = `DELETE FROM providers_detail WHERE provider_id = $1`;
      const providersDetailrData = [id];
      await client.query(providersDetailQuery, providersDetailrData);

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
   * Enable a provider.
   * @param profile schema name
   * @param id provider id
   */
  public enableProviderById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.providers SET enabled = 'true' WHERE id = $1`,
      [id]
    );
  };
}

export const providerSvcs = new ProviderSvcs();
