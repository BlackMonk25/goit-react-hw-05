
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import MovieList from '../components/MovieList';

// function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get('q');

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3a7979acae263e33f85c56b16315941c&query=${query}`);
//       setMovies(res.data.results);
//     };
//     if (query) fetchMovies();
//   }, [query]);

//   return (
//     <div>
//       <h1>Search Results for "{query}"</h1>
//       <MovieList movies={movies} />
//     </div>
//   );
// }

// export default MoviesPage;


import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';  // отримуємо параметр 'q' з URL

  // Хук для запиту фільмів
  useEffect(() => {
    if (!query) return; // Якщо параметр порожній, не робимо запит

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3a7979acae263e33f85c56b16315941c&query=${query}`);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]); // Пошук фільмів при зміні запиту

  // Функція для обробки зміни пошукового запиту
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams({ q: value }); // Оновлюємо параметр у URL
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form>
        <input 
          type="text" 
          value={query}
          onChange={handleSearchChange}
          placeholder="Enter movie name"
        />
      </form>

      <h2>Search Results for "{query}"</h2>
      {movies.length === 0 ? (
        <p>No movies found for "{query}".</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default MoviesPage;