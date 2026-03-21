import playIcon from "../assets/img/play-icon.png";

function Feature({ title, description}) {
  return (
    <main className="feature-section">
      <div className="content-wrapper">
        <div className="tags-list">
          <span>Drama</span>
          <span>Thriller</span>
          <span>Supernatural</span>
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
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>

        <div className="control-buttons">
          <button className="start-stream">
            STREAM NOW
            <img src={playIcon} alt="play" />
          </button>

          <button className="episodes-list">ALL EPISODES</button>
        </div>
      </div>
    </main>
  );
}

export default Feature;