// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logo from "../assets/img/starwars-logo.png";  // make sure this file exists

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites } = store;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">

        {/* Brand logo */}
        <Link className="navbar-brand p-0" to="/">
          <img
            src={logo}
            alt="Star Wars Logo"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links + Favorites dropdown */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Standard links */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
      

            {/* Favorites dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-primary dropdown-toggle"
                id="favDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites{" "}
                <span className="badge bg-secondary">
                  {favorites.length}
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="favDropdown"
              >
                {favorites.length === 0 ? (
                  <li className="dropdown-item text-muted">
                    No favorites yet
                  </li>
                ) : (
                  favorites.map((item) => (
                    <li
                      key={`${item.type}-${item.id}`}
                      className="dropdown-item d-flex justify-content-between align-items-center"
                    >
                      <Link
                        to={`/single/${item.id}`}
                        className="text-decoration-none"
                      >
                        {item.name}
                      </Link>
                      <button
                        className="btn btn-sm btn-link text-danger p-0 ms-2"
                        onClick={() =>
                          dispatch({ type: "TOGGLE_FAVORITE", payload: item })
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        🗑️
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
