const API_BASE_URL = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_LOCALHOST
    : process.env.REACT_APP_API_URL_DEPLOY;

export default API_BASE_URL;