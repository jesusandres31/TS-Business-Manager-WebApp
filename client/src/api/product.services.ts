import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';
// interface
import { ProviderDetail, ProviderDetailForm } from './providerDetail.services';

/**
 * Interface for GET method.
 */
export interface Product {
  id: number;
  product_type_id: number;
  name: string;
  stock: number;
  sale_price: number;
  barcode: string;
  min_stock: number;
  enabled: boolean;
  provider_details: Array<ProviderDetail>;
}

/**
 * Interface for POST/PUT method.
 */
export interface ProductForm {
  product_type_id: number | string;
  name: string;
  stock: number | string;
  sale_price: number | string;
  barcode: string;
  min_stock: number | string;
  provider_details: Array<ProviderDetailForm>;
}

/**
 * Fetch all
 */
export const fetchProducts = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-products`;
  const { data } = await axios.get<Product[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchProductById = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-product/${id}`;
  const { data } = await axios.get<Product>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Create one
 */
export const createProduct = async (productData: ProductForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/create-product`;
  return await axios.post(url, productData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update one
 */
export const updateProduct = async (id: number, productData: ProductForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-product/${id}`;
  return await axios.put(url, productData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Disable one
 */
export const disableProduct = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/disable-product/${id}`;
  return await axios.delete(url, config).catch((err) => {
    throw err;
  });
};

/**
 * Enable one
 */
export const enableProduct = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/enable-product/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    throw err;
  });
};
