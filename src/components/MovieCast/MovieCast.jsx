import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useOutletContext();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8`,
            },
          }
        );
        setCast(response.data.cast);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error('Error fetching cast:', err);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>Error fetching cast data.</p>;

  return (
    <div className={styles.movieCast}>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <strong>{actor.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;