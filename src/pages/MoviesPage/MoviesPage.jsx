// import { useState } from 'react';
// import axios from 'axios';
// import MovieList from '../../components/MovieList/MovieList';
// import styles from './MoviesPage.module.css';

// const MoviesPage = () => {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);

//   const handleSearch = () => {
//     if (query) {
//       axios
//         .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8`,
//           },
//         })
//         .then(response => setMovies(response.data.results))
//         .catch(err => console.log(err));
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.searchBar}>
//         <input
//           type="text"
//           className={styles.input}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search movies..."
//         />
//         <button className={styles.button} onClick={handleSearch}>
//           Search
//         </button>
//       </div>

//       <MovieList movies={movies} />
//     </div>
//   );
// };

// export default MoviesPage;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryParam) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${queryParam}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ query: query.trim() });
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
