import img1 from "../assets/img/breaking-bad.jpg";
import img2 from "../assets/img/the-rain.jpg";
import img3 from "../assets/img/life-in-a-year.jpg";
import img4 from "../assets/img/money-heist-korea.jpg";
import img5 from "../assets/img/squid-game.jpg";

function Popular() {
  return (
    <section className="popular-section">
      <div className="content-wrapper">
        <div className="popular-header">
          <h4>POPULAR THIS WEEK</h4>

          <div className="navigation-arrows">
            <button className="arrow-left">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="arrow-right">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="shows-row">
          <img src={img1} alt="Breaking Bad" />
          <img src={img2} alt="The Rain" />
          <img src={img3} alt="Life in a Year" />
          <img src={img4} alt="Money Heist Korea" />
          <img src={img5} alt="Squid Game" />
        </div>
      </div>
    </section>
  );
}

export default Popular;