import { Middleware } from 'redux';
import jwt from 'jwt-decode';
import axios from 'axios';
import { RootState } from '../app/rootReducer';
import { AppDispatch } from '../app/store';
import { signOut, refresh } from '../features/auth/authSlice';
import { getAccessToken, isAuthenticated, Token } from '../utils/auth';

/**
 * Example Middleware
 */
export const customMiddleware: Middleware<{}, RootState> = (store) => (
  next
) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

/**
 * Check if token was altered Middleware
 */
export const checkLegitToken: Middleware<{}, RootState> = (store) => (next) => (
  action
) => {
  if (action.type.includes('auth/')) return next(action);

  if (!action.type.includes('Start') && !action.type.includes('/pending'))
    return next(action);

  // verify the accessToken is legit
  const browserToken = getAccessToken();
  const stateToken = store.getState().auth.authUser.accessToken!;
  if (isAuthenticated()) {
    if (browserToken !== stateToken)
      return (store.dispatch as AppDispatch)(signOut());
  } else {
    return (store.dispatch as AppDispatch)(signOut());
  }

  return next(action);
};

/**
 * Refresh Token Middleware
 */
export const checkTokenExpiration: Middleware<{}, RootState> = (store) => (
  next
) => (action) => {
  if (action.type.includes('auth/')) return next(action);

  if (!action.type.includes('Start') && !action.type.includes('/pending'))
    return next(action);

  // meanwhile, logout in tokenExpire
  var decodedToken: Token = jwt(store.getState().auth.authUser.accessToken!);
  /* const token = getToken();
  if (typeof token === 'string') {
    const decodedToken: Token = jwt(token); */
  // if (decodedToken.exp > dateNow.getTime()) {
  if (decodedToken.exp < Date.now() / 1000) {
    return (store.dispatch as AppDispatch)(signOut());
  }

  //
  /* axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status } = error.response;
      if (status === 401) {
        return (store.dispatch as AppDispatch)(signOut());
      }
      return;
    }
  ); */

  return next(action);
};
