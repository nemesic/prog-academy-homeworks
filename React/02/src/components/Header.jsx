import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHeart } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/img/netflix-logo.png";
import avatar from "../assets/img/avatar.png";

function Header({ search, setSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const dropdownRef = useRef(null);
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFavOpen(false);
      }
    };

    if (favOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [favOpen]);

  const handleWatch = (movie) => {
    alert(`Запускаем просмотр: ${movie.title}`);
    setFavOpen(false);
  };

  return (
    <header className="main-header">
      <div className="content-wrapper">

        {/* LEFT */}
        <div className="header-left">
          <div className="netflix-brand">
            <Link to="/">
              <img src={logo} alt="Netflix" />
            </Link>
          </div>
          <span className="date-text">Friday, July 8th</span>
        </div>

        {/* NAV */}
        <nav className="nav-menu">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/price">PRICE</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/admin">ADMIN</Link>
        </nav>

        {/* RIGHT */}
        <div className="header-right">

          {/* SEARCH */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="search-icon"
            size="lg"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ cursor: "pointer" }}
          />

          {searchOpen && (
            <input
              ref={(el) => el?.focus()}
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`header-search ${searchOpen ? "active" : ""}`}
            />
          )}

          {/* FAVORITES */}
          <div className="favorites-wrapper" ref={dropdownRef}>
            <FontAwesomeIcon
              icon={faHeart}
              className="heart-icon"
              size="lg"
              onClick={() => setFavOpen(!favOpen)}
              style={{ cursor: "pointer" }}
            />

            <span className="favorites-count">{favorites.length}</span>

            {/* DROPDOWN */}
            <div className={`favorites-dropdown ${favOpen ? "active" : ""}`}>
              <h4>Favorites ({favorites.length})</h4>

              {favorites.length === 0 && (
                <p style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                  No favorites yet
                </p>
              )}

              {favorites.map((movie) => (
                <div key={movie.id} className="favorite-item">
                  <img 
                    src={movie.img || "https://via.placeholder.com/50x70"} 
                    alt={movie.title} 
                  />
                  <div className="info">
                    <h5>{movie.title}</h5>
                    <p>{movie.year || "2024"}</p>
                  </div>

                  <div className="actions">
                    <button 
                      className="btn-watch"
                      onClick={() => handleWatch(movie)}
                    >
                      Watch
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => removeFromFavorites(movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

    
            </div>
          </div>

          {/* PROFILE */}
          <div className="profile-container">
            <img src={avatar} alt="profile" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;