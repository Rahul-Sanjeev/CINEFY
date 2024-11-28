import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import MoviesPage from "./components/MoviesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";

import MovieDetailsPage from "./components/MovieDetailsPage";
import AddMovies from "./components/AddMovies";
import EditMoviePage from "./components/EditMoviePage";

import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Login and Register Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Home, Movies, About, Contact Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add Movie Page */}
          <Route path="/add-movie" element={<AddMovies />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/editmovie/:id" element={<EditMoviePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
