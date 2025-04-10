
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import MovieCast from '../components/MovieCast';
// import MovieReviews from '../components/MovieReviews';
// import styles from './MovieDetailsPage.module.css';

// function MovieDetailsPage() {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3a7979acae263e33f85c56b16315941c`);
//       setMovie(res.data);
//     };
//     fetchMovieDetails();
//   }, [movieId]);

//   if (!movie) return <p>Loading...</p>;

//   return (
//     <div className={styles.movieDetails}>
//       <h2>{movie.title}</h2>
//       <p className={styles.movieOverview}>{movie.overview}</p>
//       <img className={styles.moviePoster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//       <button className={styles.button} onClick={() => navigate(-1)}>Go back</button>
//       <MovieCast movieId={movieId} />
//       <MovieReviews movieId={movieId} />
//     </div>
//   );
// }

// export default MovieDetailsPage;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3a7979acae263e33f85c56b16315941c`);
      setMovie(res.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className={styles.movieDetails}>
      <h2>{movie.title}</h2>
      <p className={styles.movieOverview}>{movie.overview}</p>
      <img className={styles.moviePoster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <button className={styles.button} onClick={() => navigate(-1)}>Go back</button>
      {/* Вкладений маршрут для MovieCast і MovieReviews */}
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;