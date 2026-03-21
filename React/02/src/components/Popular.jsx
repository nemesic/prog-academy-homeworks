import { useRef } from "react";
import { movies } from "../data/movies";
import MovieCard from "./MovieCard";

function Popular() {
  const rowRef = useRef(null);
  const scrollLeft = () => {
    rowRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
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
          {
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              img={movie.img}
              title={movie.title}
            />
          ))
          }
        </div>
        </div>
    </section>
  );
}

export default Popular;