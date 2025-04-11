import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8`,
        },
      })
      .then(response => setMovies(response.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;



