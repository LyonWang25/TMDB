import { useState } from "react";
import { useWatchlistStore } from "../stores/useWatchListStore";
import PosterCard from "../components/PosterCard/PosterCard";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import { ImCancelCircle } from "react-icons/im";

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlistStore();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<
    "default" | "release_date" | "rating"
  >("default");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pickedMovie, setPickedMovie] = useState<
    (typeof watchlist)[number] | null
  >(null);

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    if (sortType === "release_date") {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }
    if (sortType === "rating") {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  const handlePickRandomMovie = () => {
    if (watchlist.length === 0) return;

    setIsModalOpen(true);
    setIsLoading(true);

    setTimeout(() => {
      const randomMovie =
        watchlist[Math.floor(Math.random() * watchlist.length)];
      setPickedMovie(randomMovie);
      setIsLoading(false);
    }, 1000);
  };

  const handleGoToMovie = () => {
    if (pickedMovie) {
      navigate(`/movie/${slugify(pickedMovie.title)}-${pickedMovie.id}`);
      setIsModalOpen(false);
    }
  };

  const handleSpinAgain = () => {
    handlePickRandomMovie();
  };

  return (
    <div className="px-6 py-10 min-h-screen bg-black text-white">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">My Watchlist</h1>

        <div className="flex items-center gap-4">
          <select
            value={sortType}
            onChange={(e) =>
              setSortType(
                e.target.value as "default" | "release_date" | "rating"
              )
            }
            className="text-sm md:text-base bg-gray-800 text-white p-2 rounded-md"
          >
            <option value="default">Sort by Added Time</option>
            <option value="release_date">
              Sort by Release Date (New → Old)
            </option>
            <option value="rating">Sort by Rating (High → Low)</option>
          </select>

          <button
            onClick={handlePickRandomMovie}
            className="text-sm md:text-base bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold"
          >
            🎲 Watch Lottery
          </button>
        </div>
      </div>

      {/* Movie List */}
      {sortedWatchlist.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sortedWatchlist.map((movie) => (
            <div key={movie.id} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  removeFromWatchlist(movie.id);
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-xs 
                z-20 w-8 h-8 flex items-center justify-center cursor-pointer"
                type="button"
              >
                <FaTrash size={14} />
              </button>
              <PosterCard movie={movie} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
          <div className="relative bg-gray-900 p-6 rounded-lg max-w-sm w-full text-center space-y-4">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-white text-xl hover:text-gray-300 cursor-pointer"
              aria-label="Close"
              type="button"
            >
              <ImCancelCircle size={24} />
            </button>

            {isLoading ? (
              <div className="text-white text-lg animate-pulse">
                Spinning...
              </div>
            ) : pickedMovie ? (
              <>
                <h2 className="text-xl font-bold">{pickedMovie.title}</h2>
                <img
                  src={
                    pickedMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${pickedMovie.poster_path}`
                      : "/default-poster.png"
                  }
                  alt={pickedMovie.title}
                  className="w-full rounded-lg"
                />
                <div className="flex gap-4 justify-center mt-4">
                  <button
                    onClick={handleGoToMovie}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Watch Now
                  </button>
                  <button
                    onClick={handleSpinAgain}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
                  >
                    🎲 Spin Again
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
