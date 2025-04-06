
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3a7979acae263e33f85c56b16315941c&query=${query}`);
      setMovies(res.data.results);
    };
    if (query) fetchMovies();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
