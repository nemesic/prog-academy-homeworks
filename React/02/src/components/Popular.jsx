import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

function Popular({ search = "" , onSelectMovie}) {
const rowRef = useRef(null);

const [apiMovies, setApiMovies] = useState([]);
const API_KEY = "9eee1c8a9ca4c5306eb86111905631a1";

 useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
          ),
        ]);

        const moviesData = await moviesRes.json();
        const seriesData = await seriesRes.json();

        const moviesList = moviesData.results || [];
        const seriesList = seriesData.results || [];

        const combined = [...moviesList, ...seriesList];

        const formatted = combined.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          img: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://via.placeholder.com/300x450",
          raw: item,
        }));

        setApiMovies(formatted);
      } catch (error) {
        console.log("TMDB error:", error);
      }
    };

    fetchData();
  }, []);

const filteredMovies = apiMovies.filter((movie) =>
  movie.title.toLowerCase().includes(search.toLowerCase()));
  
const scrollLeft = () => {
  rowRef.current?.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRight = () => {
  rowRef.current?.scrollBy({ left: 300, behavior: "smooth" });
};

return (
    <section className="popular-section">
      <div className="content-wrapper">
        <div className="popular-header">
          <h4>POPULAR THIS WEEK</h4>

          <div className="navigation-arrows">
            <button className="arrow-left" 
            onClick={scrollLeft}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="arrow-right" 
            onClick={scrollRight}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div className="shows-row" ref={rowRef}>
          {filteredMovies.length === 0 && <p>Loading...</p>}

          {filteredMovies.map((movie) => (
            <MovieCard 
            key={movie.id}
            img={movie.img}
            title={movie.title}
            movie={movie}
            onSelect={onSelectMovie}
            />
          ))}
        </div>

      </div>
    </section>
  );
}


export default Popular;