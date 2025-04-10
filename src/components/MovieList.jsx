

// import React from 'react';
// import styles from './MovieList.module.css';
// import { Link } from 'react-router-dom';

// function MovieList({ movies }) {
//   return (
//     <div className={styles.movieList}>
//       {movies.map((movie) => (
//         <div key={movie.id} className={styles.movieItem}>
//           <Link to={`/movies/${movie.id}`}>
//             <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//             <div className={styles.movieTitle}>{movie.title}</div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MovieList;


import React from 'react';
import styles from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

function MovieList({ movies }) {
  const location = useLocation(); // Отримуємо поточне розташування

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.movieItem}>
          <Link 
            to={`/movies/${movie.id}`} 
            state={{ from: location }} // Передаємо поточне місцезнаходження через state
          >
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/path/to/default-image.jpg'} 
              alt={movie.title} 
            />
            <div className={styles.movieTitle}>{movie.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MovieList;