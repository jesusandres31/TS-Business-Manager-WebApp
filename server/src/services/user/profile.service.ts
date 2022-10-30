import { pool } from '../../database';
import { QueryResult } from 'pg';
import { IProf } from '../../interfaces';

class ProfileSvcs {
  /**
   * Get profile info.
   * @param profile schema name
   */
  public getProfile = async (profile: string): Promise<QueryResult> => {
    return await pool.query(`SELECT * FROM ${profile}.profile`);
  };

  /**
   * Update global config data.
   * @param profile schema name
   * @param profileData profile data
   */
  public updateGlobalConfig = async (
    profile: string,
    profileData: IProf
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.profile SET (
        company_name, 
        language,
        locality,
        phone,
        email,
        website
      ) = ($1, $2, $3, $4, $5, $6)`,
      [
        profileData.company_name,
        profileData.language,
        profileData.locality,
        profileData.phone,
        profileData.email,
        profileData.website,
      ]
    );
  };

  /**
   * Update value config data.
   * @param profile schema name
   * @param profileData profile data
   */
  public updateValueConfig = async (
    profile: string,
    profileData: IProf
  ): Promise<void> => {
    await pool.query(
      `UPDATE ${profile}.profile SET (
        payment_type_id, 
        product_type_id,
        sale_type_id
      ) = ($1, $2, $3)`,
      [
        profileData.payment_type_id,
        profileData.product_type_id,
        profileData.sale_type_id,
      ]
    );
  };
}

export const profileSvcs = new ProfileSvcs();
