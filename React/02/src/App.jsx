import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./styles/fixstyle.css";
import Header from "./components/Header";
import Feature from "./components/Feature";
import Popular from "./components/Popular";
import RatingBox from "./components/RatingBox";
import { movies as initialMovies } from "./data/movies";
// import RangeCompare from "./components/RangeCompare";
// import { FavoritesContext } from "./context/FavoritesContext";
import { FavoritesProvider } from "./context/FavoritesProvider";
import About from "./pages/About";
import Price from "./pages/Price";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";


function Home({ search  }) {
  // const [value, setValue] = useState(0);
  const [movies] = useState(initialMovies);
  const [apiMovies, setApiMovies] = useState([]);
  // const [search, setSearch] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [prevSelected, setPrevSelected] = useState(null);

  const handleSelectMovie = (movie) => {
    setPrevSelected(selectedMovie);
    setSelectedMovie(movie);
  };

  return (
    <>
    {/* <FavoritesProvider value={{ value, setValue }}>
     <Header search={search} setSearch={setSearch} /> */}

      <Feature
        title="Stranger Things"
        description="Stranger Things is an American science fiction horror drama..."
      />

      <Popular
        movies={[...movies, ...apiMovies]}
        setApiMovies={setApiMovies}     
        search={search}
        onSelectMovie={handleSelectMovie}
      />

      <RatingBox />
      {/* <RangeCompare /> */}

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

function App() {
  const [search, setSearch] = useState("");

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header search={search} setSearch={setSearch} />

        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/price" element={<Price />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;