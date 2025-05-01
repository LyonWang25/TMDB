import { MovieSummary } from "../../api/types";
import WatchListButton from "../WatchListButton";

interface MovieInfoProps {
  title: string;
  runtime: number;
  adult: boolean;
  releaseDate: string;
  overview: string;
  movie: MovieSummary;
}

const MovieInfo = ({
  title,
  runtime,
  adult,
  releaseDate,
  overview,
  movie,
}: MovieInfoProps) => {
  const rating = adult ? "R" : "PG";

  return (
    <>
      {/* Title */}
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <WatchListButton movie={movie} />
      </div>

      {/* Basic Info & Overview */}
      <div className="flex flex-col md:flex-row justify-between gap-8 p-6">
        <div className="text-l md:text-xl space-y-4 md:w-1/2">
          <p>
            <strong>Runtime:</strong> {runtime} min
          </p>
          <p>
            <strong>Rated:</strong> {rating}
          </p>
          <p>
            <strong>Release Date:</strong> {releaseDate}
          </p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-l md:text-xl font-bold mb-2">Overview</h2>
          <p className="text-l md:text-xl text-gray-300">{overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
