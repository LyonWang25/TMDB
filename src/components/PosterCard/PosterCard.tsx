import { Link } from "react-router-dom";
import { MovieSummary } from "../../api/types";
import { slugify } from "../../utils/slugify";
import PosterImage from "./posterImage";
import PosterInfo from "./PosterInfo";

interface PosterCardProps {
  movie: MovieSummary;
  isCenter?: boolean;
  className?: string;
}

const PosterCard = ({
  movie,
  isCenter = false,
  className,
}: PosterCardProps) => {
  const movieUrl = `/movie/${slugify(movie.title)}-${movie.id}`;

  return (
    <Link to={movieUrl}>
      <div
        className={`cursor-pointer transform flex flex-col items-center transition-all duration-300 ${
          isCenter ? "scale-100 z-20" : "scale-90 opacity-80 hover:opacity-100"
        } ${className ?? ""}`}
      >
        <PosterImage movie={movie} isCenter={isCenter} />
        <PosterInfo movie={movie} />
      </div>
    </Link>
  );
};

export default PosterCard;
