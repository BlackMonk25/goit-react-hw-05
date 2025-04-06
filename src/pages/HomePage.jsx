import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import MovieSearch from '../components/MovieSearch';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=3a7979acae263e33f85c56b16315941c');
      setMovies(res.data.results);
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieSearch />
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;

