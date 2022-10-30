import axios from 'axios';
import { API_EXT } from '../utils';

export interface ExtraTypes {
  id: number | string;
  name: string;
}

export const fetchRoles = async () => {
  const url = `${API_EXT}/get-roles`;
  const { data } = await axios.get<ExtraTypes[]>(url);
  return data;
};

export const fetchProductTypes = async () => {
  const url = `${API_EXT}/get-product-types`;
  const { data } = await axios.get<ExtraTypes[]>(url);
  return data;
};

export const fetchPaymentTypes = async () => {
  const url = `${API_EXT}/get-payment-types`;
  const { data } = await axios.get<ExtraTypes[]>(url);
  return data;
};

export const fetchSaleTypes = async () => {
  const url = `${API_EXT}/get-sale-types`;
  const { data } = await axios.get<ExtraTypes[]>(url);
  return data;
};

export const fetchLanguages = async () => {
  const url = `${API_EXT}/get-langs`;
  const { data } = await axios.get<ExtraTypes[]>(url);
  return data;
};
