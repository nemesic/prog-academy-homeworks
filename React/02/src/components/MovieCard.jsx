import PropTypes from "prop-types";

function MovieCard({ img, title}) {
  return (
      <img
      src={img}
      alt={title}
      onClick={() => alert(title)}
    />
  );
}


MovieCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

MovieCard.defaultProps = {
  title: "No title",
};

export default MovieCard;