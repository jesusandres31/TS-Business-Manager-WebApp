import axios from 'axios';
import { API_USR, getAccessToken, handleError } from '../utils';

/**
 * Interface for GET method.
 */
export interface User {
  id: number;
  role_id: number;
  locality: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  enabled: boolean;
}

/**
 * Interface for POST/PUT method.
 */
export interface UserForm {
  role_id: number | string;
  locality: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

/**
 * Fetch all
 */
export const fetchUsers = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-users`;
  const { data } = await axios.get<User[]>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Fetch one
 */
export const fetchUserById = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/get-user/${id}`;
  const { data } = await axios.get<User>(url, config).catch((err) => {
    throw err;
  });
  return data;
};

/**
 * Create one
 */
export const createUser = async (userData: UserForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/signup-user`;
  return await axios.post(url, userData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Update one
 */
export const updateUser = async (id: number, userData: UserForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/update-user/${id}`;
  return await axios.put(url, userData, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Disable one
 */
export const disableUser = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/disable-user/${id}`;
  return await axios.delete(url, config).catch((err) => {
    throw err;
  });
};

/**
 * Enable one
 */
export const enableUser = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/enable-user/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    handleError(err);
  });
};

/**
 * Reset user password
 */
export const resetUserPsswd = async (id: number) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_USR}/reset-user-psswd/${id}`;
  return await axios.patch(url, {}, config).catch((err) => {
    throw err;
  });
};
