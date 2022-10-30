import jwt from 'jwt-decode';

const ACCESS_TOKEN_KEY: any = 'accessToken';
const REFRESH_TOKEN_KEY: any = 'refreshToken';

export interface Token {
  exp: number;
  iat: number;
  profile: string;
  role: string;
  sub: number; // user id
}

export function getCurrentRoleAndId(token: string) {
  const decodedToken: Token = jwt(token);
  let role = decodedToken.role;
  let id = decodedToken.sub;
  return { role, id };
}

export function isAuthenticated() {
  return !!getAccessToken() && !!getRefreshToken();
}

export function isRemember() {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const getAccessToken = () => {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
};

export const getRefreshToken = () => {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
};

export function login(
  remember: boolean,
  accessToken: string,
  refreshToken: string
) {
  if (remember) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function logout() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
