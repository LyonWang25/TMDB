import { useEffect, useState } from "react";
import { API } from "../api/api";
import { MovieSummary } from "../api/types";
import LandingCarousel from "../components/LandingCarousel";
import Header from "../components/Header";
const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieSummary[]>([]);

  useEffect(() => {
    API.getNowPlayingMovies().then((res) => {
      console.log("now playing", res.data);
      console.log("now playing2", res.data.results);
      setNowPlayingMovies(res.data?.results.slice(0, 8));
    });
  }, []);

  if (nowPlayingMovies.length === 0) return <p>Loading...</p>;

  return (
    <div className="relative z-0">
      <Header />
      <LandingCarousel movies={nowPlayingMovies} />
    </div>
  );
};

export default Home;
