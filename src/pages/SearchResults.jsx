import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-white text-2xl font-bold mb-6">
        Search Results for &ldquo;{query}&rdquo;
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
