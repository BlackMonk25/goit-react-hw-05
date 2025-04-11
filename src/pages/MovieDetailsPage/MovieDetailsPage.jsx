import { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8', 
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { title, overview, poster_path, vote_average, genres } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div className={css.detailsPage}>
      <Link to={backLinkRef.current} className={css.goBack}>
        Go back
      </Link>

      <div className={css.content}>
        <img src={posterUrl} alt={title} />
        <div className={css.info}>
          <h1>{title}</h1>
          <p>
            <strong>User Score:</strong> {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul className={css.links}>
          <li>
            <Link to="cast" className={css.link}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" className={css.link}>Reviews</Link>  
          </li>
        </ul>
      </div>

 
      <Suspense fallback={<div>Loading section...</div>}>
        <Outlet context={{ movieId }} />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;