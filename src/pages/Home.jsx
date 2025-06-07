import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularmovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularmovies();
  }, []); //we pass a function with a dependecy array
  //we will check the dependecy array after every rerender and if changed
  // since the last time we ran the useeffect then we will run the useeffect

  const handleSearch = async (e) => {
    e.preventDefault(); //to prevent the default behaviour of reloading the page
    if (!searchQuery.trim()) return;
    if (loading) return; //won't allow us to search if we are already searching for something
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      setError("Failed to search movies ..");
    } finally {
      setLoading(false); //we stop loading whether or not an error occured
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className=" search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
