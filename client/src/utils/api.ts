// set enviroment variable for production or development
const getEnvironmentVar = () => {
  if (process.env.NODE_ENV === 'production')
    return process.env.REACT_APP_PROD_API;
  return process.env.REACT_APP_DEV_API;
};

// extra routes
export const API_EXT = getEnvironmentVar() + '/ext';

// auth routes
export const API_AUTH = getEnvironmentVar() + '/auth';

// settings routes
export const API_SET = getEnvironmentVar() + '/set';

// users routes
export const API_USR = getEnvironmentVar() + '/usr';

// handle Axios error
export const handleError = (err: any) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw err.response.data;
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    throw err.request;
  } else {
    // Something happened in setting up the request that triggered an err
    throw err.message;
  }
};
