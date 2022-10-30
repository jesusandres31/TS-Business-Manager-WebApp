import axios from 'axios';
import { API_SET, handleError, getAccessToken } from '../utils';
/**
 * Interface for GET method.
 */
import { User } from './user.services';

/**
 * Interface for POST/PUT method.
 */
export interface SettingsForm {
  username: string;
  password: string;
  new_user_or_psswd: string;
}

/**
 * getMyUser
 */
export const getMyUser = async () => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_SET}/get-my-user`;
  const { data } = await axios.get<User>(url, config).catch((err) => {
    handleError(err);
    throw err;
  });
  return data;
};

/**
 * changeUsername
 */
export const changeUsername = async (userData: SettingsForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_SET}/change-username`;
  return await axios.put(url, userData, config).catch((err) => {
    handleError(err);
    throw err;
  });
};

/**
 * changePsswd
 */
export const changePsswd = async (userData: SettingsForm) => {
  const token = getAccessToken();
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const url = `${API_SET}/change-password`;
  return await axios.put(url, userData, config).catch((err) => {
    handleError(err);
    throw err;
  });
};
