import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "../styles/App.module.css";
import { BallTriangle } from "react-loader-spinner";

const HomePage = lazy(() => import("../pages/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const MovieCast = lazy(() => import("./MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews"));

export const App = () => {
  return (
    <div className={styles.container}>
      <Navigation />

      <Suspense fallback={<BallTriangle color="#00BFFF" height={80} width={80} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
export default App;
