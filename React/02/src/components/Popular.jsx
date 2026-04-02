import { useEffect, useState, useMemo } from "react";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function Popular({ search = "" ,  movies = [], setApiMovies, onSelectMovie }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

const API_KEY = "9eee1c8a9ca4c5306eb86111905631a1";

 useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);

      try {
        const [moviesRes, seriesRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`
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

        if (!ignore) {
        setApiMovies((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const newItems = formatted.filter((m) => !ids.has(m.id));
          return [...prev, ...newItems];
        });
      }

      } catch (error) {
        console.log("TMDB error:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();
    return () => {
    ignore = true; 
  };
}, [page, setApiMovies]);


const filteredMovies = useMemo(() => {
  if (!search.trim()) return movies;

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );
}, [movies, search]);

const scrollLeft = () => {
  swiperInstance?.slidePrev();
};

const scrollRight = () => {
  swiperInstance?.slideNext();
};

const loadMore = () => {
  setPage((prev) => prev + 1);
};

return (
  <section className="popular-section">
    <div className="content-wrapper">
      <div className="popular-header">
        <h4>POPULAR THIS WEEK</h4>

        <div className="navigation-arrows">
          <button className="arrow-left" onClick={scrollLeft}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="arrow-right" onClick={scrollRight}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <Swiper
        className="shows-row"
        modules={[Navigation, Autoplay]}
        onSwiper={setSwiperInstance}
        spaceBetween={14}
        slidesPerView={2.1}
        navigation={false}
        autoplay={{ delay: 3300, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          860: { slidesPerView: 4.5 },
          1080: { slidesPerView: 5.5 },
          1300: { slidesPerView: 6.5 },
        }}
      >
        {filteredMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              img={movie.img}
              title={movie.title}
              movie={movie}
              onSelect={onSelectMovie}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="load-more-btn" onClick={loadMore} disabled={loading}>
          {loading && <span className="spinner"></span>}
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  </section>
);
}

export default Popular;