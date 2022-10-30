import { pool } from '../../database';
import { QueryResult } from 'pg';
import { ICli, IUpCliDebt } from '../../interfaces';

class ClientSvcs {
  /**
   * Get client by company_name.
   * @param profile schema name
   * @param name company name
   */
  public getClientByCompany = async (
    profile: string,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE company_name = $1`,
      [name]
    );
  };

  /**
   * Get client by tax_id.
   * @param profile schema name
   * @param tax_id tax id
   */
  public getClientByTaxId = async (
    profile: string,
    tax_id: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE tax_id = $1`,
      [tax_id]
    );
  };

  /**
   * Get a different client by company_name.
   * @param profile schema name
   * @param id client id
   * @param name company name
   */
  public getDifferentClientByCompany = async (
    profile: string,
    id: number,
    name: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE id != $1 AND company_name = $2`,
      [id, name]
    );
  };

  /**
   * Get a different client by tax_id.
   * @param profile schema name
   * @param id client id
   * @param tax_id tax id
   */
  public getDifferentClientByTaxId = async (
    profile: string,
    id: number,
    tax_id: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE id != $1 AND tax_id = $2`,
      [id, tax_id]
    );
  };

  /**
   * Get client by email.
   * @param profile schema name
   * @param email client email
   */
  public getClientByEmail = async (
    profile: string,
    email: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE email = $1`,
      [email]
    );
  };

  /**
   * Get a different client by email.
   * @param profile schema name
   * @param id client id
   * @param email client email
   */
  public getDifferentClientByEmail = async (
    profile: string,
    id: number,
    email: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.clients WHERE id != $1 AND email = $2`,
      [id, email]
    );
  };

  /**
   * Create a client.
   * @param profile schema name
   * @param newReg client data
   */
  public createClient = async (profile: string, newReg: ICli): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Creating a Client.
      const clientQuery = `INSERT INTO clients (
        locality,
        company_name,
        tax_id,
        name,
        surname,
        email,
        phone,
        address,
        debt,
        enabled
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      const clientData = [
        newReg.locality,
        newReg.company_name,
        newReg.tax_id,
        newReg.name,
        newReg.surname,
        newReg.email,
        newReg.phone,
        newReg.address,
        0,
        true,
      ];
      await client.query(clientQuery, clientData);

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
   * Get all clients.
   * @param profile schema name
   */
  public getClients = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.clients`);
  };

  /**
   * Get a specific client.
   * @param profile schema name
   * @param id client id
   */
  public getClientById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.clients WHERE id = $1`, [
      id,
    ]);
  };

  /**
   * Update a client.
   * @param profile schema name
   * @param id client id
   * @param clientData client data
   */
  public updateClientById = async (
    profile: string,
    id: number,
    clientData: ICli
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.clients SET (
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
        clientData.locality,
        clientData.company_name,
        clientData.tax_id,
        clientData.name,
        clientData.surname,
        clientData.email,
        clientData.phone,
        clientData.address,
        id,
      ]
    );
  };

  /**
   * Update client debt.
   * @param profile schema name
   * @param id client id
   * @param clientDebt client debt
   */
  public updateClientDebt = async (
    profile: string,
    newReg: IUpCliDebt
  ): Promise<any> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // update client debt
      await client.query(`UPDATE clients SET debt = $1 WHERE id = $2`, [
        newReg.updated_debt,
        newReg.client_id,
      ]);

      // Creating a checking_account register.
      const checkingAccQuery = `INSERT INTO checking_accounts ( 
        client_id,
        report_master_id,
        created,
        previous_debt,
        movement
      ) VALUES ($1, $2, $3, $4, $5)`;
      const checkingAccData = [
        newReg.client_id,
        -1,
        newReg.created,
        newReg.previous_debt,
        newReg.movement,
      ];
      await client.query(checkingAccQuery, checkingAccData);

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
   * Disable a client.
   * @param profile schema name
   * @param id client id
   */
  public disableClientById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.clients SET enabled = 'false' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Enable a client.
   * @param profile schema name
   * @param id client id
   */
  public enableClientById = async (
    profile: string,
    id: number
  ): Promise<any> => {
    await pool.query(
      `UPDATE ${profile}.clients SET enabled = 'true' WHERE id = $1`,
      [id]
    );
  };
}

export const clientSvcs = new ClientSvcs();
