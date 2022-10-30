import { pool } from '../database';

class SettingSvcs {
  /**
   * Change password.
   * @param profile schema name
   * @param id user id
   * @param newPassword new password
   */
  public changePsswd = async (
    profile: string,
    id: number,
    newPassword: string
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET password = $1 WHERE id = $2`,
      [newPassword, id]
    );
  };

  /**
   * Change username.
   * @param profile schema name
   * @param newUsername new username
   * @param username username
   */
  public changeUsername = async (
    profile: string,
    id: number,
    newUsername: string
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.users SET username = $1 WHERE id = $2`,
      [newUsername, id]
    );
  };
}

export const settingSvcs = new SettingSvcs();
