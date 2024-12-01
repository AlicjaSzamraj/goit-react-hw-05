import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import styles from "../styles/MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query === "") return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=9c9b6688511a48ff9588b6ca86715896&query=${query}`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.search.value.trim();

    if (!newQuery) {
      setError("You must enter a movie title.");
      return;
    }

    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.moviesPage}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input type="text" name="search" placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
