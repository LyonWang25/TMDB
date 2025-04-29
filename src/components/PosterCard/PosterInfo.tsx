import { MovieSummary } from "../../api/types";

interface PosterInfoProps {
  movie: MovieSummary;
}

const PosterInfo = ({ movie }: PosterInfoProps) => {
  return (
    <div className="mt-3 text-center text-white space-y-1 w-[220px]">
      <h3 className="text-md md:text-lg font-bold text-white">{movie.title}</h3>
      <p className="text-sm md:text-base text-gray-300">
        {movie.release_date
          ? new Date(movie.release_date).toLocaleString("default", {
              year: "numeric",
              month: "long",
            })
          : "Unknown release date"}{" "}
        • {movie.adult ? "R" : "PG"}
      </p>
      <p className="text-sm md:text-base text-yellow-400">
        {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"} /
        10
      </p>
    </div>
  );
};

export default PosterInfo;
