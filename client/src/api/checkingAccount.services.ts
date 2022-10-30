import axios from 'axios';
import { API_USR, getAccessToken } from '../utils';
// constants
import { checkingAccLength } from '../constants';

/**
 * Interface for GET method.
 */
export interface CheckingAcc {
  id: number;
  client_id: number;
  report_master_id: number;
  created: string;
  previous_debt: number;
  movement: number;
}

/**
 * Fetch some
 */
export const fetchCheckingAccByClient = async (
  clientId: number,
  page: number
) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  let itemsPerPage: number = checkingAccLength;
  const url = `${API_USR}/get-checking-account/${clientId}/${page}/${itemsPerPage}`;
  const { data } = await axios.get<CheckingAcc[]>(url, config);
  return data;
};
