import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import styles from "../styles/HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=9c9b6688511a48ff9588b6ca86715896"
        );
        setMovies(response.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Popular Movies</h1>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
