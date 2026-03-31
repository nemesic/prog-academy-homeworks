import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

function MovieCard({ img, title, movie, onSelect }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);

  const fav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 

    if (fav) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={img}
        alt={title}
        onClick={() => onSelect(movie)}
      />

      {}
      <i
        className={`fa-${fav ? "solid" : "regular"} fa-heart`}
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          color: fav ? "red" : "white",
          cursor: "pointer",
          fontSize: "18px",
        }}
      />
    </div>
  );
}

export default MovieCard;