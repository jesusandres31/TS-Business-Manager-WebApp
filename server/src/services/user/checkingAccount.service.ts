import { pool } from '../../database';
import { QueryResult } from 'pg';
import { ICheck } from '../../interfaces';

class CheckingAccSvcs {
  /**
   * Get a specific client.
   * @param profile schema name
   * @param id client id
   */
  public getCheckingAccByClient = async (
    profile: string,
    clientId: number,
    pageNumber: number,
    itemsPerPage: number
  ): Promise<QueryResult> => {
    return await pool.query(
      `SELECT * FROM ${profile}.checking_accounts
        WHERE client_id = $1
        ORDER BY created DESC
        LIMIT ${itemsPerPage} OFFSET (${pageNumber} - 1) * ${itemsPerPage}`,
      [clientId]
    );
  };
}

export const checkingAccSvcs = new CheckingAccSvcs();
