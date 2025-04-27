import { useEffect, useState } from "react";
import { API } from "../api/api";
import { MovieSummary } from "../api/types";
import LandingCarousel from "../components/LandingCarousel";
import MovieCarousel from "../components/MovieCarousel/index";
import { useLayoutLoadingStore } from "../stores/useLayoutLoadingStore";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieSummary[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieSummary[]>([]);
  const { setLoading } = useLayoutLoadingStore();

useEffect(() => {
  setLoading(true);
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

  return (
    <div className="relative z-0">
      <LandingCarousel movies={nowPlayingMovies} />
      <MovieCarousel movies={popularMovies} />
    </div>
  );
};

export default Home;
