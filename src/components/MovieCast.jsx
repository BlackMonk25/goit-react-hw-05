// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function MovieCast({ movieId }) {
//   const [cast, setCast] = useState([]);

//   useEffect(() => {
//     const fetchCast = async () => {
//       const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3a7979acae263e33f85c56b16315941c`);
//       setCast(res.data.cast);
//     };
//     fetchCast();
//   }, [movieId]);

//   return (
//     <div>
//       <h4>Cast</h4>
//       <ul>
//         {cast.map((actor) => (
//           <li key={actor.id}>{actor.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MovieCast;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Використовуємо useParams для отримання movieId
import axios from 'axios';

function MovieCast() {
  const { movieId } = useParams(); // Отримуємо movieId з параметрів маршруту
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3a7979acae263e33f85c56b16315941c`);
        setCast(res.data.cast);
      } catch (error) {
        setError('Failed to load cast');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]); // Викликається кожного разу, коли movieId змінюється

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h4>Cast</h4>
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      ) : (
        <p>No cast available for this movie.</p>
      )}
    </div>
  );
}

export default MovieCast;