import axios from 'axios';
import { API_AUTH, getRefreshToken, handleError } from '../utils';

/**
 * Interface for GET method.
 */
export interface AuthUser {
  id: number | null;
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

/**
 * Interface for POST/PUT method.
 */
export interface LoginForm {
  profile: string;
  username: string;
  password: string;
}

/**
 * signIn
 */
export const signIn = async (authData: LoginForm) => {
  const url = `${API_AUTH}/signin`;
  const { data } = await axios.post<AuthUser>(url, authData).catch((err) => {
    handleError(err);
    throw err;
  });
  return data;
};

/**
 * refresh token
 */
export const refresh = async () => {
  const token = getRefreshToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_AUTH}/refresh`;
  const { data } = await axios.get<AuthUser>(url, config).catch((err) => {
    handleError(err);
    throw err;
  });
  return data;
};
