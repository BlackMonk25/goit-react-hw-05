// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function MovieReviews({ movieId }) {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3a7979acae263e33f85c56b16315941c`);
//       setReviews(res.data.results);
//     };
//     fetchReviews();
//   }, [movieId]);

//   return (
//     <div>
//       <h4>Reviews</h4>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review.id}>
//             <p>{review.content}</p>
//             <p><strong>{review.author}</strong></p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default MovieReviews;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Імпортуємо useParams для отримання параметрів маршруту
import axios from 'axios';

function MovieReviews() {
  const { movieId } = useParams(); // Отримуємо movieId з параметрів маршруту
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3a7979acae263e33f85c56b16315941c`);
        setReviews(res.data.results);
      } catch (error) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]); // Викликаємо fetchReviews, якщо movieId змінюється

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
              <p><strong>{review.author}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
}

export default MovieReviews;