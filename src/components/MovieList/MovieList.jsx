import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => (
  <ul className={styles.movieList}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.movieListItem}>
        <Link to={`/movies/${movie.id}`}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
          />
          <h2>{movie.title}</h2>
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieList;