// src/components/MovieSearch.tsx
import { useEffect, useState, useRef } from "react";
import { API } from "../api/api";
import PosterCard from "./MovieCarousel/PosterCard"; // 注意 PosterCard 放的位置
import { MovieSummary } from "../api/types";
interface MovieSearchProps {
  onQueryChange: (query: string) => void;
}
const MovieSearch = ({ onQueryChange }: MovieSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSummary[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const hasSearchQuery = query.trim().length > 0;

  useEffect(() => {
    onQueryChange(query); // ➡️ 每次 query 改變，通知外面 (Home)

    if (!hasSearchQuery) {
      setResults([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      setError(null);
      API.searchMovies(query, page)
        .then((res) => {
          if (page === 1) {
            setResults(res.data.results || []);
          } else {
            setResults((prev) => [...prev, ...(res.data.results || [])]);
          }
          setHasMore(res.data.page < res.data.total_pages);
        })
        .catch(() => {
          setError("搜尋失敗，請稍後再試");
        })
        .finally(() => setLoading(false));
    }, 300); // debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [query, page, onQueryChange]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && hasSearchQuery) {
        setPage((prev) => prev + 1);
      }
    });

    observer.current.observe(loadMoreRef.current);
  }, [results, hasMore, loading, hasSearchQuery]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-black opacity-100 h-auto justify-center w-full h-auto items-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="holder_text px-4 py-2 w-full max-w-md rounded-full 
        border border-gray-300 focus:outline-none focus:ring-1 focus:ring-red-600"
        />

        {error && <div className="text-red-500 mt-4">{error}</div>}
        {loading && results.length === 0 && (
          <div className="text-white mt-4">Loading...</div>
        )}

        {hasSearchQuery && results.length === 0 && !loading && !error && (
          <div className="text-gray-400 mt-4">找不到符合的電影</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {results.map((movie) => (
            <PosterCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* 空白區域觸發無限滾動 */}
        {hasSearchQuery && <div ref={loadMoreRef} className="h-10" />}
      </div>
    </div>
  );
};

export default MovieSearch;
