import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/index'; // If you have combined reducers, keep it here

// Create the store with Redux Toolkit
const store = configureStore({
    reducer: rootReducer, // Replace with your slice reducers if you’re using them
    devTools: process.env.NODE_ENV !== 'production', // Enables Redux DevTools in development
});

export default store;
