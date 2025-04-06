import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3a7979acae263e33f85c56b16315941c`);
      setReviews(res.data.results);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p><strong>{review.author}</strong></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
