import { pool } from '../../database';
import { QueryResult } from 'pg';
import path from 'path';
import fs from 'fs';
import { ITen } from '../../interfaces';

class TenantSvcs {
  /**
   * Create a Schema in database for a tenant.
   * Also create the 'manager' user for that tenant.
   * @param newReg tenant data
   */
  public createTenantSchema = async (newReg: ITen): Promise<void> => {
    const profileName: string = newReg.profile;
    const sqlPartialPath = '/database/tenantSchema.sql';
    const tenantSchemaPath = path.join(
      __dirname,
      '../../../../' + sqlPartialPath
    );
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`CREATE SCHEMA ${profileName};`);
      await client.query(`SET search_path TO ${profileName};`);

      // Executing SQL file (Creating Tenant's Schema).
      const rawSql = fs.readFileSync(tenantSchemaPath).toString();
      await client.query(rawSql);

      // Creating Profile.
      const profileQuery = `INSERT INTO profile (
        profile, 
        company_name,
        language,
        locality,
        email,
        phone,
        website,
        created,
        max_members,
        payment_type_id,
        product_type_id,
        sale_type_id,
        enabled
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
      const now = new Date();
      const profileData = [
        newReg.profile,
        newReg.company_name,
        newReg.language,
        newReg.locality,
        newReg.email,
        newReg.phone,
        newReg.website,
        now,
        newReg.max_members,
        newReg.payment_type_id,
        newReg.product_type_id,
        newReg.sale_type_id,
        true,
      ];
      await client.query(profileQuery, profileData);

      // Creating manager account.
      const managerAccountQuery = `INSERT INTO users (
        role_id, 
        locality,
        name,
        surname,
        email,
        phone,
        username,
        password,
        enabled
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const managerAccountData = [
        '2',
        newReg.locality,
        newReg.manager.manager_name,
        newReg.manager.manager_surname,
        newReg.manager.manager_email,
        newReg.manager.manager_phone,
        newReg.manager.manager_username,
        newReg.manager.manager_password,
        true,
      ];
      await client.query(managerAccountQuery, managerAccountData);

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
   * Select all Tenant's Schemas and ignore default Postgres Schemas.
   */
  public getTenants = async (): Promise<QueryResult> => {
    return await pool.query(
      `SELECT schema_name 
      FROM information_schema.schemata
      WHERE (schema_name <> 'information_schema')
      AND (schema_name <> 'public')
      AND (schema_name <> 'information_schema')
      AND (schema_name <> 'pg_catalog')
      AND (schema_name <> 'pg_toast_temp_1')
      AND (schema_name <> 'pg_temp_1')
      AND (schema_name <> 'pg_toast');`
    );
  };

  /**
   * Get a specific tenants by profile.
   * @param profile schema name
   */
  public getTenantByPro = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.profile`);
  };

  /**
   * Get users from a specific tenant.
   * @param profile schema name
   */
  public getTenantsUsers = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.users`);
  };

  /**
   * Disable a tenant.
   * @param profile schema name
   */
  public disableTenantByPro = async (profile: string): Promise<void> => {
    await pool.query(`UPDATE ${profile}.profile SET enabled = 'false'`);
  };

  /**
   * Enable a tenant.
   * @param profile schema name
   */
  public enableTenantByPro = async (profile: string): Promise<void> => {
    await pool.query(`UPDATE ${profile}.profile SET enabled = 'true'`);
  };

  /**
   *  Disable user from a tenant.
   * @param profile schema name
   * @param id user Id
   */
  public disableTenantUser = async (
    profile: string,
    id: number
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET enabled = 'false' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Enable s from a tenant.
   * @param profile schema name
   * @param id user Id
   */
  public enableTenantUser = async (
    profile: string,
    id: number
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET enabled = 'true' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Update 'max_member' attribute of a tenant.
   * @param profile schema name
   * @param maxMembers max member number
   */
  public updateMaxMem = async (
    profile: string,
    maxMembers: number
  ): Promise<void> => {
    await pool.query(`UPDATE ${profile}.profile SET max_members = $1`, [
      maxMembers,
    ]);
  };

  /**
   * Reset password of 'Manager' users from a tenant.
   * @param profile schema name
   * @param password password
   */
  public resetMgrPsswd = async (
    profile: string,
    password: string
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET password = $1 WHERE role_id = 2`,
      [password]
    );
  };

  /**
   * Change 'schema_name' attribute of a tenant.
   * @param profile schema name
   * @param newName new name
   */
  public changeSchemaName = async (
    profile: string,
    newName: string
  ): Promise<void> => {
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`ALTER SCHEMA ${profile} RENAME TO ${newName};`);
      await client.query(`UPDATE ${newName}.profile SET profile = $1;`, [
        newName,
      ]);
      // End transaction.
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.log('Database error. ROLLBACK was called');
      throw e;
    } finally {
      // Closing connection.
      client.release();
    }
  };
}

export const tenantSvcs = new TenantSvcs();
