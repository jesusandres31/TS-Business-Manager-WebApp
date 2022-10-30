import { pool } from '../database';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

class AuthSvcs {
  /**
   * Check Schema.
   * @param profile schema name
   */
  public checkSchema = async (profile: string): Promise<QueryResult> => {
    return await pool.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`,
      [profile]
    );
  };

  /**
   * Get user by id.
   * @param profile schema name
   * @param username username
   */
  public getUserById = async (
    profile: string,
    id: number
  ): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.users WHERE id = $1`, [
      id,
    ]);
  };

  /**
   * Get user by Username.
   * @param profile schema name
   * @param username username
   */
  public getUserByUsername = async (
    profile: string,
    username: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.users WHERE username = $1`,
      [username]
    );
  };

  /**
   * Get profile.
   * @param profile schema name
   */
  public getProfile = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.profile`);
  };

  /**
   * Get role name by role id.
   * @param role_id users role id
   */
  public getRoleName = async (role_id: number): Promise<string> => {
    const response: QueryResult = await pool.query(
      `SELECT name FROM roles WHERE id = $1`,
      [role_id]
    );
    return response.rows[0].name;
  };

  /**
   * Get enabled users.
   * @param profile schema name
   */
  public getEnabledUsers = async (profile: string): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.users WHERE enabled = true`
    );
  };

  /**
   * Validate password.
   * @param profile schema name
   * @param username username
   * @param password password
   */
  public validatePasswd = async (
    profile: string,
    username: string,
    password: string
  ): Promise<boolean> => {
    const response: QueryResult = await pool.query(
      `SELECT * FROM ${profile}.users WHERE username = $1`,
      [username]
    );
    return await bcrypt.compare(password, response.rows[0].password);
  };

  /**
   * Reset password.
   * @param profile schema name
   * @param username username
   * @param password password
   */
  public resetPassword = async (
    profile: string,
    username: string,
    password: string
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET 
        password = $1
      WHERE username = $2`,
      [password, username]
    );
  };
}

export const authSvcs = new AuthSvcs();
