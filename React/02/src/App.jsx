import { useState } from "react";
import "./styles/style.css";
import Header from "./components/Header";
import Feature from "./components/Feature";
import Popular from "./components/Popular";
import RatingBox from "./components/RatingBox";
import CreateMovie from "./components/CreateMovie";
import { movies as initialMovies } from "./data/movies";
import RangeCompare from "./components/RangeCompare";

function App() {
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
    <>
      <Header search={search} setSearch={setSearch} />
      <Feature title="Stranger Things" description="Stranger Things is an American science fiction horror drama streaming television series created by The Duffer Brothers for Apple TV+. The series premiered on June 16, 2019, and is based on the 2016 novel of the same name by the Duffer Brothers." />
      <CreateMovie onAddMovie={addMovie} />
      <Popular  movies={movies} search={search} onSelectMovie={handleSelectMovie} />
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

    </>
  );
}


export default App;