import { MovieSummary } from "../../api/types";
import { getImageUrl } from "../../utils/image";
import { CiImageOff } from "react-icons/ci";

interface PosterImageProps {
  movie: MovieSummary;
  isCenter?: boolean;
}

const PosterImage = ({ movie, isCenter = false }: PosterImageProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md w-[220px] h-[330px]">
      {movie.poster_path ? (
        <img
          loading="lazy"
          src={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title || "No title"}
          className="w-full h-full object-cover rounded-xl"
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-6xl">
          <CiImageOff className="text-white" />
          <div>
            <span className="text-white text-sm">No Image Found</span>
          </div>
        </div>
      )}

      {!isCenter && (
        <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
      )}
    </div>
  );
};

export default PosterImage;
