import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg shadow-lg w-full h-auto"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <h3 className="text-white font-semibold text-lg">{movie.title}</h3>
        <p className="text-gray-300 text-sm">
          {new Date(movie.release_date).getFullYear()}
        </p>
        <div className="flex items-center mt-1">
          <span className="text-yellow-400">★</span>
          <span className="text-white ml-1">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
