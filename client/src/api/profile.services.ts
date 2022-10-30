import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';

/**
 * Interface for GET method.
 */
export interface Profile {
  profile_name: string;
  company_name: string;
  language: string;
  locality: string;
  phone: string;
  email: string;
  website: string;
  created: string;
  max_members: number;
  payment_type_id: number;
  product_type_id: number;
  sale_type_id: number;
  enabled: boolean;
}

/**
 * Interfaces for POST/PUT method.
 */
export interface GlobalConfig {
  company_name: string;
  language: string;
  locality: string;
  phone: string;
  email: string;
  website: string;
}

export interface ValueConfig {
  payment_type_id: number | string;
  product_type_id: number | string;
  sale_type_id: number | string;
}

/**
 * Fetch profile
 */
export const fetchProfile = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-profile`;
  const { data } = await axios.get<Profile>(url, config);
  return data;
};

/**
 * Update global config
 */
export const updateGlobalConfig = async (configData: GlobalConfig) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-global-config`;
  return await axios.put(url, configData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update value config
 */
export const updateValueConfig = async (configData: ValueConfig) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-value-config`;
  return await axios.put(url, configData, config).catch((err) => {
    handleError(err);
  });
};
