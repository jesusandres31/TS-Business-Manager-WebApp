import { pool } from '../../database';
import { QueryResult } from 'pg';
import { IUser } from '../../interfaces';

class UserSvcs {
  /**
   * Get user by email.
   * @param profile schema name
   * @param email user email
   */
  public getUserByEmail = async (
    profile: string,
    email: string
  ): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.users WHERE email = $1`, [
      email,
    ]);
  };

  /**
   * Get a different user.
   * @param profile schema name
   * @param id user id
   * @param email user email
   */
  public getDifferentUserByEmail = async (
    profile: string,
    id: number,
    email: string
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.users WHERE id != $1 AND email = $2`,
      [id, email]
    );
  };

  /**
   * Signup an user.
   * @param profile schema name
   * @param newReg user data
   */
  public createUser = async (profile: string, newReg: IUser): Promise<void> => {
    // Open connection.
    const client = await pool.connect();
    try {
      // Beggin transaction.
      await client.query('BEGIN');
      await client.query(`SET search_path TO ${profile};`);

      // Creating User account.
      const userAccountQuery = `INSERT INTO users (
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
      const userAccountData = [
        newReg.role_id,
        newReg.locality,
        newReg.name,
        newReg.surname,
        newReg.email,
        newReg.phone,
        newReg.username,
        newReg.password,
        true,
      ];
      await client.query(userAccountQuery, userAccountData);

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
   * Get all users.
   * @param profile schema name
   */
  public getUsers = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.users`);
  };

  /**
   * Get a specific user.
   * @param profile schema name
   * @param id user id
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
   * Update an user.
   * @param profile schema name
   * @param id user id
   * @param userData user data
   */
  public updateUserById = async (
    profile: string,
    id: number,
    userData: IUser
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET (
      locality,
      name,
      surname,
      email,
      phone,
      role_id
    ) = ( $1, $2, $3, $4, $5, $6 ) WHERE id = $7`,
      [
        userData.locality,
        userData.name,
        userData.surname,
        userData.email,
        userData.phone,
        userData.role_id,
        id,
      ]
    );
  };

  /**
   * Disable an user.
   * @param profile schema name
   * @param id user id
   */
  public disableUserById = async (
    profile: string,
    id: number
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET enabled = 'false' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Enable an user.
   * @param profile schema name
   * @param id user id
   */
  public enableUserById = async (
    profile: string,
    id: number
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET enabled = 'true' WHERE id = $1`,
      [id]
    );
  };

  /**
   * Reset password of an user.
   * @param profile schema name
   * @param id user id
   * @param password user password
   */
  public resetUserPsswd = async (
    profile: string,
    id: number,
    password: string
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET password = $1 WHERE id = $2`,
      [password, id]
    );
  };
}

export const userSvcs = new UserSvcs();
