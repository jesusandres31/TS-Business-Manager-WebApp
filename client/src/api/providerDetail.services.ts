import axios from 'axios';
import { API_USR, getAccessToken } from '../utils';

/**
 * Interface for GET method.
 */
export interface ProviderDetail {
  id: number;
  product_id: number;
  provider_id: number;
  purchase_price: number;
}

/**
 * Interface for POST/PUT method.
 */
export interface ProviderDetailForm {
  provider_id: number | string;
  purchase_price: number | string;
}

/**
 * Fetch one
 */
export const fetchProvidersDetail = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-providers-detail`;
  const { data } = await axios.get<ProviderDetail[]>(url, config);
  return data;
};
