import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MoviesPage from "./components/MoviesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

import MovieDetailsPage from "./components/MovieDetailsPage";
import AddMovies from "./components/AddMovies";
import EditMoviePage from "./components/EditMoviePage";

import ResetPassword from "./components/Account/ResetPassword";
import ResetPasswordConfirm from "./components/Account/ResetPasswordConfirm";
import Activation from "./components/Account/Activation";

import { Provider } from "react-redux";
import store from "./components/Account/Store";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";

// Protected Route Component
const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route path="/activate/:uid/:token" element={<Activation />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/movies" element={<ProtectedRoute element={<MoviesPage />} />} />
            <Route path="/about" element={<ProtectedRoute element={<AboutPage />} />} />
            <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
            <Route path="/add-movie" element={<ProtectedRoute element={<AddMovies />} />} />
            <Route path="/movies/:id" element={<ProtectedRoute element={<MovieDetailsPage />} />} />
            <Route path="/editmovie/:id" element={<ProtectedRoute element={<EditMoviePage />} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
