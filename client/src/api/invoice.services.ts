import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';
import { IDate } from '../interfaces';

/**
 * Interface for GET method.
 */
export interface ReportMaster {
  id: number;
  client_id: number;
  user_id: number;
  sale_type_id: number;
  payment_type_id: number;
  created: string | Date;
  fee_percentage: number;
  total: number;
  payment: number;
  debt: number;
  old_debt: number;
  report_details: Array<ReportDetail>;
}

export interface ReportDetail {
  id: number;
  report_master_id: number;
  product_id: number;
  amount: number;
  units: number;
  unit_price: number;
  fee_percentage: number;
  subtotal: number;
}

/**
 * Interface for POST/PUT method.
 */
export interface ReportMasterForm {
  id?: number | string;
  client_id: number | string;
  user_id: number | string;
  sale_type_id: number | string;
  payment_type_id: number | string;
  created: string | Date;
  fee_percentageTotal: number | string;
  total: number | string;
  payment: number | string;
  debt: number | string;
  old_debt: number;
  report_details: Array<ReportDetailForm>;
}

export interface ReportDetailForm {
  product_id: number | string;
  amount: number | string;
  units: number | string;
  unit_price: number | string;
  fee_percentage: number | string;
  subtotal: number | string;
}

export interface IArticlesToDistribute {
  product_id: number;
  amount: number;
  units: number;
}

/**
 * Fetch all
 */
export const fetchInvoices = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-invoices`;
  const { data } = await axios.get<ReportMaster[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchInvoiceDetail = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-invoice-detail/${id}`;
  const { data } = await axios.get<ReportDetail[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchInvoiceById = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-invoice/${id}`;
  const { data } = await axios.get<ReportMaster>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch some
 */
export const fetchArticlesToDistribute = async (dateData: IDate) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-articles-to-distribute`;
  const { data } = await axios
    .post<IArticlesToDistribute[]>(url, dateData, config)
    .catch((err) => {
      throw err;
    });

  return data;
};

/**
 * Create one
 */
export const createInvoice = async (invoiceData: ReportMasterForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/create-invoice`;
  return await axios.post(url, invoiceData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update one
 */
export const updateInvoice = async (
  id: number,
  invoiceData: ReportMasterForm
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-invoice/${id}`;
  return await axios.put(url, invoiceData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Disable one
 */
export const deleteInvoice = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/delete-invoice/${id}`;
  return await axios.delete(url, config).catch((err) => {
    throw err;
  });
};

/**
 * Enable one
 */
export const enableInvoice = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/enable-invoice/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    throw err;
  });
};
