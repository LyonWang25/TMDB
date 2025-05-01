import { useEffect, useRef, useState } from "react";
import { API } from "../api/api";
import { MovieSummary } from "../api/types";
import LandingCarousel from "../components/LandingCarousel";
import MovieCarousel from "../components/MovieCarousel";
import { useLayoutLoadingStore } from "../stores/useLayoutLoadingStore";
import { useSearchStore } from "../stores/useSearchStore";
import PosterCard from "../components/PosterCard/PosterCard";

const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieSummary[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieSummary[]>([]);
  const { setLoading } = useLayoutLoadingStore();

  const searchQuery = useSearchStore((state) => state.searchQuery);
  const hasSearchQuery = searchQuery.trim().length > 0;

  const [searchResults, setSearchResults] = useState<MovieSummary[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasSearchQuery) {
      setSearchResults([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    setSearchLoading(true);
    setPage(1);
    API.searchMovies(searchQuery, 1)
      .then((res) => {
        setSearchResults(res.data?.results || []);
        setHasMore(res.data.page < res.data.total_pages);
      })
      .catch((err) => console.error("Search failed", err))
      .finally(() => setSearchLoading(false));
  }, [searchQuery]);

  useEffect(() => {
    if (page === 1 || !hasSearchQuery) return;

    setSearchLoading(true);
    API.searchMovies(searchQuery, page)
      .then((res) => {
        setSearchResults((prev) => [...prev, ...(res.data?.results || [])]);
        setHasMore(res.data.page < res.data.total_pages);
      })
      .catch((err) => console.error("Search failed", err))
      .finally(() => setSearchLoading(false));
  }, [page]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !searchLoading) {
        setPage((prev) => prev + 1);
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [searchResults, hasMore, searchLoading]);

  // Fetch initial carousels
  useEffect(() => {
    setLoading(true);
    Promise.all([API.getNowPlayingMovies(), API.getPopularMovies()])
      .then(([nowPlayingRes, popularRes]) => {
        setNowPlayingMovies(nowPlayingRes.data?.results.slice(0, 8) || []);
        setPopularMovies(popularRes.data?.results.slice(0, 20) || []);
      })
      .catch((err) => console.error("Failed to fetch movies", err))
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="relative z-0">
      {hasSearchQuery ? (
        <div className="flex flex-col items-center py-6 bg-black min-h-screen">
          {searchLoading && searchResults.length === 0 && (
            <div className="text-white mt-4 text-lg">Loading...</div>
          )}

          {!searchLoading && searchResults.length === 0 && (
            <div className="text-gray-400 mt-4 text-lg">No results found</div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 px-6 w-full max-w-6xl">
            {searchResults.map((movie) => (
              <PosterCard key={movie.id} movie={movie} />
            ))}
          </div>

          {hasMore && <div ref={loadMoreRef} className="h-10 mt-6" />}
        </div>
      ) : (
        <>
          <LandingCarousel movies={nowPlayingMovies} />
          <MovieCarousel movies={popularMovies} />
        </>
      )}
    </div>
  );
};

export default Home;
