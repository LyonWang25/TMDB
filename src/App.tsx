import  Home  from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import WatchlistPage from "./pages/WatchlistPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Layout from "./layout/Layout";
import ErrorPage from "./pages/ErrorPage";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="movie/:slugId" element={<MovieDetailPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
