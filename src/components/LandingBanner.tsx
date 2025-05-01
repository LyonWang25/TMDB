import { getImageUrl } from "../utils/image";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import { MovieSummary } from "../api/types";
import { CiImageOff } from "react-icons/ci";
import WatchListButton from "./WatchListButton";

interface LandingBannerProps {
  backdropPath: string;
  title: string;
  description: string;
  movieId: number;
  movieSummary: MovieSummary;
}

const LandingBanner = ({
  backdropPath,
  title,
  description,
  movieId,
  movieSummary,
}: LandingBannerProps) => {
  const navigate = useNavigate();
  const movieUrl = `/movie/${slugify(title)}-${movieId}`;

  const handleMoreInfo = () => {
    navigate(movieUrl);
  };

  return (
    <section className="relative w-full min-h-[500px] text-white overflow-hidden">
      {/* background image layer */}
      {backdropPath ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getImageUrl(backdropPath)})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center pb-2">
          <CiImageOff className="text-6xl text-gray-600" />
          <p className="text-gray-400">No Image Found</p>
        </div>
      )}

      {/* mask layer */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* content layer*/}
      <div className="relative z-20 max-w-6xl h-full px-6 py-10">
        <div className="flex flex-col gap-2 justify-end min-h-[400px] md:min-h-[500px]">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-sm md:text-lg mb-6">{description}</p>
          <div className="flex gap-4 justify-center sm:justify-start">
            <WatchListButton movie={movieSummary} />
            <button
              className="text-sm md:text-base bg-white text-black hover:bg-gray-200 font-bold py-2 px-6 rounded-full transition cursor-pointer"
              type="button"
              onClick={handleMoreInfo}
            >
              Movie Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBanner;
