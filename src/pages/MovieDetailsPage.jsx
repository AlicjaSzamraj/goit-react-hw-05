import { useState, useEffect, useRef } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import styles from "../styles/MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=9c9b6688511a48ff9588b6ca86715896`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={styles.movieDetailsPage}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        &larr; Back to Movies
      </Link>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movie && (
        <>
          <div className={styles.movieInfo}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
            )}
            <div className={styles.details}>
              <h1>{movie.title}</h1>
              <p>
                <strong>User Score:</strong> {movie.vote_average}
              </p>
              <p>
                <strong>Overview:</strong> {movie.overview}
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h2>Additional Information</h2>
            <nav className={styles.subNav}>
              <NavLink
                to="cast"
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Cast
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? styles.linkActive : styles.link
                }
              >
                Reviews
              </NavLink>
            </nav>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
