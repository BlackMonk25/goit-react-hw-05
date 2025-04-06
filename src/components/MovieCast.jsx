import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3a7979acae263e33f85c56b16315941c`);
      setCast(res.data.cast);
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h4>Cast</h4>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
