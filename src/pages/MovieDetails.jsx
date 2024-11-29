import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../services/movieService";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-6">
      <div className="container mx-auto px-4">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-white hover:text-gray-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400 mr-2">★</span>
              <span className="text-white">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-white">
                {movie.release_date.split("-")[0]}
              </span>
              <span className="text-gray-400 mx-2">|</span>
              <span className="text-white">{movie.runtime} min</span>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                Overview
              </h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            {movie.tagline && (
              <div className="mt-4 italic text-gray-400">
                &ldquo;{movie.tagline}&rdquo;
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
