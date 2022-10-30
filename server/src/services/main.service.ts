import { pool } from '../database';
import { QueryResult } from 'pg';
import path from 'path';
import fs from 'fs';
import { IDev } from '../interfaces';

class MainSvcs {
  /**
   * Check if Users table exists in Public schema.
   */
  public doesTableExist = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT to_regclass('public.users');`);
  };

  /**
   * Check if there is an user already registered.
   */
  public getSomeUser = async (): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM users;`);
  };

  /**
   * Creating Public Schema from a raw SQL file.
   */
  public createPublicSchema = async (): Promise<void> => {
    const sqlPartialPath = '/database/publicSchema.sql';
    const publicSchemaPath = path.join(__dirname, '../../../' + sqlPartialPath);
    try {
      const rawSql = fs.readFileSync(publicSchemaPath).toString();
      await pool.query(rawSql);
    } catch (e) {
      throw e;
    }
  };

  /**
   * Create Dev account.
   * @param newReg dev registration data
   */
  public signupDev = async (newReg: IDev): Promise<void> => {
    await pool.query(
      `INSERT INTO users (
          role_id,
          locality,
          name,
          surname,
          email,
          phone,
          username,
          password,
          enabled
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        '1',
        newReg.locality,
        newReg.name,
        newReg.surname,
        newReg.email,
        newReg.phone,
        newReg.username,
        newReg.password,
        true,
      ]
    );
  };
}

export const mainSvcs = new MainSvcs();
