

// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './Navigation';

// // Ледаче завантаження компонентів
// const HomePage = lazy(() => import('../pages/HomePage'));
// const MoviesPage = lazy(() => import('../pages/MoviesPage'));
// const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
// const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// // Ледаче завантаження компонентів MovieCast та MovieReviews
// const MovieCast = lazy(() => import('./MovieCast'));
// const MovieReviews = lazy(() => import('./MovieReviews'));

// function App() {
//   return (
//     <Router>
//       <Navigation />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/movies" element={<MoviesPage />} />
//           <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
//             {/* Вкладені маршрути */}
//             <Route path="cast" element={<MovieCast />} />
//             <Route path="reviews" element={<MovieReviews />} />
//           </Route>
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;


import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';  // BrowserRouter більше не потрібно, оскільки він вже в main.jsx
import Navigation from './Navigation';

// Ледаче завантаження компонентів
const HomePage = lazy(() => import('../pages/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Ледаче завантаження компонентів MovieCast та MovieReviews
const MovieCast = lazy(() => import('./MovieCast'));
const MovieReviews = lazy(() => import('./MovieReviews'));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            {/* Вкладені маршрути */}
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;