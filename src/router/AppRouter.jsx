import { Route, Routes } from "react-router-dom";
import { HomePage, MoviePage } from '../movies/pages/index'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="movie/:id" element={<MoviePage />} />
    </Routes>
  );
};
