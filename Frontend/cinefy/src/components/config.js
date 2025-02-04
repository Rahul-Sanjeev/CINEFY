// const API_BASE_URL = process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_API_URL_LOCALHOST
//     : (process.env.REACT_APP_API_URL_DEPLOY || "https://cinefy-backend-d1o0.onrender.com");

// export default API_BASE_URL;


const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000/'
    : 'https://cinefy-backend-d1o0.onrender.com';

export default API_BASE_URL;