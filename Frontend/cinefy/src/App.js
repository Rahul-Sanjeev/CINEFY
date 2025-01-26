import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import MoviesPage from "./components/MoviesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import AddMovies from "./components/AddMovies";
import EditMoviePage from "./components/EditMoviePage";
import Login from "./components/Account/Login";
import Register from "./components/Account/Register";
import ProfilePage from "./components/ProfilePage";

// Protected Route Component
const ProtectedRoute = ({ element, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem("authToken");
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute element={<MoviesPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/movies" element={<ProtectedRoute element={<MoviesPage />} />} />
          <Route path="/about" element={<ProtectedRoute element={<AboutPage />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<ContactPage />} />} />
          <Route path="/add-movie" element={<ProtectedRoute element={<AddMovies />} />} />
          <Route
            path="/movies/:id"
            element={<ProtectedRoute element={<MovieDetailsPage />} />}
          />
          <Route
            path="/editmovie/:id"
            element={<ProtectedRoute element={<EditMoviePage />} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;