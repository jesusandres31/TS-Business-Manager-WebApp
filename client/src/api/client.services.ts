import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';

/**
 * Interface for GET method.
 */
export interface Client {
  id: number;
  locality: string;
  company_name: string;
  tax_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  debt: string;
  enabled: boolean;
}

/**
 * Interface for POST/PUT method.
 */
export interface ClientForm {
  locality: string;
  company_name: string;
  tax_id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateClientDebtForm {
  client_id: number;
  updated_debt: number | string;
  created: string | Date;
  previous_debt: number | string;
  movement: number | string;
}

/**
 * Fetch all
 */
export const fetchClients = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-clients`;
  const { data } = await axios.get<Client[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchClientById = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-client/${id}`;
  const { data } = await axios.get<Client>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Create one
 */
export const createClient = async (clientData: ClientForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/create-client`;
  return await axios.post(url, clientData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update one
 */
export const updateClient = async (id: number, clientData: ClientForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-client/${id}`;
  return await axios.put(url, clientData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Fetch some
 */
export const fetchClientsWithDebt = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-clients-with-debt/${id}`;
  const { data } = await axios.get<Client[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Update debt
 */
export const updateClientDebt = async (
  clientDebtForm: UpdateClientDebtForm
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-client-debt`;
  return await axios.put(url, clientDebtForm, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Disable one
 */
export const disableClient = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/disable-client/${id}`;
  return await axios.delete(url, config).catch((err) => {
    throw err;
  });
};

/**
 * Enable one
 */
export const enableClient = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/enable-client/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    throw err;
  });
};
