import { useEffect, useState } from "react";
import { API } from "../api/api";
import { MovieSummary } from "../api/types";
import LandingCarousel from "../components/LandingCarousel";
import Header from "../components/Header";
import MovieCarousel from "../components/MovieCarousel/index";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieSummary[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchNowPlaying = API.getNowPlayingMovies();
  const fetchPopular = API.getPopularMovies();
  const fetchTopRated = API.getTopRatedMovies();

  Promise.all([fetchNowPlaying, fetchPopular])
    .then(([nowPlayingRes, popularRes]) => {
      setNowPlayingMovies(nowPlayingRes.data?.results.slice(0, 8) || []);
      setPopularMovies(popularRes.data?.results.slice(0, 20) || []);
    })
    .catch((err) => {
      console.error("Failed to fetch movies", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative z-0">
      <Header />
      <LandingCarousel movies={nowPlayingMovies} />
      <MovieCarousel movies={popularMovies} />
    </div>
  );
};

export default Home;
