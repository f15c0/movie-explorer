import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
