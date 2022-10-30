import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';

/**
 * Interface for GET method.
 */
export interface Provider {
  id: number;
  locality: string;
  company_name: string;
  tax_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  enabled: boolean;
}

/**
 * Interface for POST/PUT method.
 */
export interface ProviderForm {
  locality: string;
  company_name: string;
  tax_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Fetch all
 */
export const fetchProviders = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-providers`;
  const { data } = await axios.get<Provider[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchProviderById = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-provider/${id}`;
  const { data } = await axios.get<Provider>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Create one
 */
export const createProvider = async (providerData: ProviderForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/create-provider`;
  return await axios.post(url, providerData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update one
 */
export const updateProvider = async (
  id: number,
  providerData: ProviderForm
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-provider/${id}`;
  return await axios.put(url, providerData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Disable one
 */
export const disableProvider = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/disable-provider/${id}`;
  return await axios.delete(url, config).catch((err) => {
    throw err;
  });
};

/**
 * Enable one
 */
export const enableProvider = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/enable-provider/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    throw err;
  });
};
