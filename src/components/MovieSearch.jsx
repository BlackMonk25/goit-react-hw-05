import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieSearch.module.css';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/movies?q=${query}`);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button className={styles.searchButton} type="submit">Search</button>
    </form>
  );
}

export default MovieSearch;


