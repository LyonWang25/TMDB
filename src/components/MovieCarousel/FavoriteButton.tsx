import { useState } from "react";

const FavoriteButton = ({ movieId }: { movieId: number }) => {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="text-sm md:text-base mt-2 px-4 py-1 rounded-full bg-red-700 hover:bg-red-600 text-white"
    >
      {liked ? "❤️ Added" : "🤍 Favorite"}
    </button>
  );
};

export default FavoriteButton;
