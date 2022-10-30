import axios from 'axios';
import { API_USR, getAccessToken } from '../utils';
import { IDate } from '../interfaces';

/**
 * clients
 */
export interface IClientsByInvoices {
  client: string;
  invoices: number;
}

export interface IProductsSoldByClient {
  product: string;
  quantity: number;
}

export interface ITotalSoldToClients {
  client: string;
  total_sold: number;
}

/**
 * providers
 */
export interface IProductsByProviders {
  provider: string;
  products: number;
}

export interface ITotalSoldByProviders {
  provider: string;
  quantity: number;
}

export interface IProductsSoldByProvider {
  product: string;
  quantity: number;
}

/**
 * products
 */
export interface IProductsByInvoice {
  product: string;
  invoices: number;
}

export interface IClientsPurchasesByProduct {
  client: string;
  quantity: number;
}

/**
 * profits
 */
export interface IProfits {
  total: number | string;
}

/**
 * CLIENTS STATS #######################################################
 */

export const fetchClientsByInvoices = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-clients-by-invoices`;
  const { data } = await axios
    .post<IClientsByInvoices[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchProductsSoldByClient = async (
  id: number,
  dateData: IDate
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-products-sold-by-client/${id}`;
  const { data } = await axios
    .post<IProductsSoldByClient[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchTotalSoldToClients = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-total-sold-to-clients`;
  const { data } = await axios
    .post<ITotalSoldToClients[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

/**
 * PROVIDERS STATS #######################################################
 */

export const fetchProductsByProviders = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-products-by-providers`;
  const { data } = await axios
    .get<IProductsByProviders[]>(url, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchTotalSoldByProviders = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-total-sold-by-providers`;
  const { data } = await axios
    .post<ITotalSoldByProviders[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchProductsSoldByProvider = async (
  id: number,
  dateData: IDate
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-products-sold-by-provider/${id}`;
  const { data } = await axios
    .post<IProductsSoldByProvider[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

/**
 * PRODUCTS STATS #######################################################
 */

export const fetchProductsByInvoice = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-products-by-invoice`;
  const { data } = await axios
    .post<IProductsByInvoice[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchClientsPurchasesByProduct = async (
  id: number,
  dateData: IDate
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-clients-purchases-by-product/${id}`;
  const { data } = await axios
    .post<IClientsPurchasesByProduct[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

/**
 * PROFITS STATS #######################################################
 */

export const fetchGrossProfits = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-gross-profits`;
  const { data } = await axios
    .post<IProfits>(url, dateData, config)
    .catch((err) => {
      throw err;
    });
  return data;
};

export const fetchTotalDebts = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-total-debts`;
  const { data } = await axios.get<IProfits>(url, config).catch((err) => {
    throw err;
  });
  return data;
};
