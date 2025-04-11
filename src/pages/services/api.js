import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc5NzlhY2FlMjYzZTMzZjg1YzU2YjE2MzE1OTQxYyIsIm5iZiI6MTc0MzY5Mzc2Ny44MjgsInN1YiI6IjY3ZWVhN2M3NDY4MGYyNmJmM2E3YmFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-9XkGOjIt6PwkvbklCVD6KHEZeNMwJcYwkdMKipMH8';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
  const response = await axiosInstance.get(`/movie/${id}/reviews`);
  return response.data.results;
};