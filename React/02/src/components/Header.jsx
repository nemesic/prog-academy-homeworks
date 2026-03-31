import logo from "../assets/img/netflix-logo.png";
import avatar from "../assets/img/avatar.png";

import { useState, useEffect, useRef, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function Header({ search, setSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const inputRef = useRef(null);

  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <header className="main-header">
      <div className="content-wrapper">

        {/* LEFT */}
        <div className="header-left">
          <div className="netflix-brand">
            <a href="#">
              <img src={logo} alt="Netflix" className="logo-image" />
            </a>
          </div>

          <span className="date-text">Friday, July 8th</span>
        </div>

        {/* RIGHT */}
        <div className="header-right">

          {/* SEARCH */}
          <i
            className="fa-solid fa-magnifying-glass fa-2x search-icon"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ cursor: "pointer" }}
          />

          {searchOpen && (
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="header-search"
            />
          )}

          {/* FAVORITES */}
          <div className="favorites-wrapper">
            <i
              className="fa-solid fa-heart fa-2x heart-icon"
              onClick={() => setFavOpen(!favOpen)}
            />
            

            {/* COUNT */}
            <span className="favorites-count">
              {favorites.length}
            </span>

            {/* DROPDOWN */}
            {favOpen && (
              <div className="favorites-dropdown">
                <h4>Favorites</h4>

                {favorites.length === 0 && (
                  <p>No favorites yet</p>
                )}

                {favorites.map((movie) => (
                  <div key={movie.id} className="favorite-item">
                    <span>{movie.title}</span>

                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => removeFromFavorites(movie.id)}
                      style={{ 
                        top: "15px",
                        right: "15px",
                        fontSize: "22px",
                        cursor: "pointer",
                      color: "white" }}
                    />
                  </div>
                  
                ))}
              </div>
            )}
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