import { useState } from "react";
import "./styles/style.css";
import Header from "./components/Header";
import Feature from "./components/Feature";
import Popular from "./components/Popular";
import RatingBox from "./components/RatingBox";
import CreateMovie from "./components/CreateMovie";
import { movies as initialMovies } from "./data/movies";
import RangeCompare from "./components/RangeCompare";
import { FavoritesContext } from "./context/FavoritesContext";
import { FavoritesProvider } from "./context/FavoritesProvider";

function App() {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState(initialMovies);
  const [search, setSearch] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [prevSelected, setPrevSelected] = useState(null);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleSelectMovie = (movie) => {
    setPrevSelected(selectedMovie);
    setSelectedMovie(movie);
  };

  return (
    <FavoritesProvider value={{ value, setValue }}>
      <Header search={search} setSearch={setSearch} />

      <Feature
        title="Stranger Things"
        description="Stranger Things is an American science fiction horror drama..."
      />

      <CreateMovie onAddMovie={addMovie} />

      <Popular
        movies={movies}
        search={search}
        onSelectMovie={handleSelectMovie}
      />

      <RatingBox />
      <RangeCompare />

      {selectedMovie && (
        <div className="movie-compare glass-card">
          <h3>Current movie</h3>

          <div className="movie-pill">
            {selectedMovie.title}
          </div>

          <h4>Previous movie:</h4>

          <div className="movie-pill">
            {prevSelected ? prevSelected.title : "None"}
          </div>
        </div>
      )}
    </FavoritesProvider>
  );
}

export default App;