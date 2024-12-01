import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9c9b6688511a48ff9588b6ca86715896`
        );
        setCast(response.data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.movieCast}>
      <h2>Cast</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {cast.length === 0 && !loading && !error && (
        <p>No cast information available.</p>
      )}
      <ul className={styles.castList}>
        {cast.map((member) => (
          <li key={member.cast_id} className={styles.castItem}>
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                alt={member.name}
                className={styles.castImage}
              />
            ) : (
              <div className={styles.noImage}>No image available</div>
            )}
            <p>
              {member.name} as {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
