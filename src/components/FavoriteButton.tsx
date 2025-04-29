// FavoriteButton.tsx
import { useWatchlistStore } from "../stores/useWatchListStore";
import { MovieSummary } from "../api/types";

const FavoriteButton = ({ movie }: { movie: MovieSummary }) => {
  const { toggleFavorite, isFavorite } = useWatchlistStore();
  const liked = isFavorite(movie.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm md:text-base mt-2 px-4 py-1 rounded-full bg-red-700 hover:bg-red-600 text-white"
    >
      {liked ? "❤️ Added" : "🤍 Favorite"}
    </button>
  );
};

export default FavoriteButton;
