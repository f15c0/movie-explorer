import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/movieService";

const MovieDetails = () => {
  const { id } = useParams();
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
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
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
            <p className="text-gray-300 mb-6">{movie.overview}</p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
