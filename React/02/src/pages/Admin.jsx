import { useState } from "react";
import CreateMovie from "../components/CreateMovie";
import { movies as initialMovies } from "../data/movies";

export default function Admin() {
  const [movies, setMovies] = useState(initialMovies);
  const [activeTab, setActiveTab] = useState("form");

  const addMovie = (newMovie) => {
    setMovies((prev) => [...prev, newMovie]);
    setActiveTab("list");
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header glass-card">
        <h1>Admin Panel</h1>
        <p>Manage and add new movies to your collection</p>
      </div>

      {/* TABS (Mobile) */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === "form" ? "active" : ""}`}
          onClick={() => setActiveTab("form")}
        >
          ➕ Add Movie
        </button>
        <button 
          className={`admin-tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          📽️ Movies ({movies.length})
        </button>
      </div>

      {/* CONTENT */}
      <div className="admin-container">
        {/* CREATE FORM */}
        <div className={`admin-form-section glass-card ${activeTab === "form" ? "active" : ""}`}>
          <h2>Add New Movie</h2>
          <CreateMovie onAddMovie={addMovie} />
        </div>

        {/* MOVIES LIST */}
        <div className={`admin-movies-section glass-card ${activeTab === "list" ? "active" : ""}`}>
          <h2>Available movies ({movies.length})</h2>
          <ul className="admin-movies-grid">
            {movies.map((movie) => (
              <li key={movie.id} className="admin-movie-item">
                <div className="admin-movie-img-wrapper">
                  <img src={movie.img} alt={movie.title} />
                </div>
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
