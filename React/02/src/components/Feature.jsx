import playIcon from "../assets/img/play-icon.png";
import { useState } from "react";

function Feature({ title, description}) {
const genres = ["Drama", "Thriller", "Supernatural"];
const maxRating = 5;
const [rating, setRating] = useState(3);

  return (
    <main className="feature-section">
      <div className="content-wrapper">
        <div className="tags-list">
           {genres.map((genre) => (<span key={genre}>{genre}</span>))}
        </div>  

        <h1 className="feature-title">{title}</h1>

        <div className="details-row">
          <span>2019</span>
          <span>
            Director: <strong>Shawn Levy</strong>
          </span>
          <span>
            Seasons: <strong>3 (5 Episodes)</strong>
          </span>
        </div>

        <div className="story-summary">
          <p>
            {description}
          </p>
        </div>
        
        <div className="stars-rating">
          {Array.from({ length: maxRating }, (_, index) => (
            <i 
            key={index} 
            onClick={() => setRating(index + 1)}
            className={
            index < rating
          ? "fa-solid fa-star"
          : "fa-regular fa-star"
        }
        ></i>
      ))
    }
</div>

        <div className="control-buttons">
          <button className="start-stream" onClick={() => alert("Streaming started")}>
            STREAM NOW
          <img src={playIcon} alt="play" />
          </button>

          <button className="episodes-list"onClick={() => alert("All episodes")}> ALL EPISODES</button>
        </div>
      </div>
    </main>
  );
}

export default Feature;