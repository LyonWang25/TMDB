import { useWatchlistStore } from "../stores/useWatchListStore";
import { MovieSummary } from "../api/types";

interface WatchlistButtonProps {
  movie: MovieSummary;
}

const WatchlistButton = ({ movie }: WatchlistButtonProps) => {
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } =
    useWatchlistStore();

    const isAdded = isInWatchlist(movie.id);

  const handleToggle = () => {
    if (isAdded) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <button
      className={`text-sm md:text-base font-bold py-2 px-6 rounded-full transition cursor-pointer
        ${
          isAdded
            ? "bg-gray-400 text-white hover:bg-gray-500"
            : "bg-red-700 text-white hover:bg-red-600"
        }`}
      onClick={handleToggle}
      data-testid="watchlist-button"
    >
      {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;
