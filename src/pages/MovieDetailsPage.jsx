
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


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Outlet } from 'react-router-dom';
// import axios from 'axios';
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

//   if (!movie) return <p>Loading movie details...</p>;

//   return (
//     <div className={styles.movieDetails}>
//       <h2>{movie.title}</h2>
//       <p className={styles.movieOverview}>{movie.overview}</p>
//       <img className={styles.moviePoster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//       <button className={styles.button} onClick={() => navigate(-1)}>Go back</button>
//       {/* Вкладений маршрут для MovieCast і MovieReviews */}
//       <Outlet />
//     </div>
//   );
// }

// export default MovieDetailsPage;

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Використовуємо useRef для збереження попереднього шляху
  const prevLocation = useRef(location);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3a7979acae263e33f85c56b16315941c`);
        setMovie(res.data);
      } catch (err) {
        setError('Failed to fetch movie details.');
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className={styles.movieDetails}>
      <h2>{movie.title}</h2>
      <p className={styles.movieOverview}>{movie.overview}</p>
      <img 
        className={styles.moviePoster} 
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'default-image.jpg'} 
        alt={movie.title} 
      />
      <button className={styles.button} onClick={() => navigate(-1)}>Go back</button>

      {/* Додаємо посилання на вкладені маршрути */}
      <div className={styles.navLinks}>
        <Link to={`/movies/${movieId}/cast`} className={styles.navLink}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`} className={styles.navLink}>Reviews</Link>
      </div>

      {/* Вкладений маршрут для MovieCast і MovieReviews */}
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;