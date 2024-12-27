import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Login and Register Pages */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset-password" element={<ResetPassword />} />
            <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route exact path="/activate/:uid/:token" element={<Activation />} />

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
    </Provider>
  );
}

export default App;
