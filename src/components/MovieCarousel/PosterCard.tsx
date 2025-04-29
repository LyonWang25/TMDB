import { useEffect, useRef, useState } from "react";
// import FavoriteButton from "./FavoriteButton";
import { MovieSummary } from "../../api/types";
import { getImageUrl } from "../../utils/image";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import  { CiImageOff }  from "react-icons/ci";

interface PosterCardProps {
  movie: MovieSummary;
}

const PosterCard = ({ movie }: PosterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const movieUrl = `/movie/${slugify(movie.title)}-${movie.id}`;

  useEffect(() => {
    const findSlideElement = (el: HTMLElement | null): HTMLElement | null => {
      if (!el) return null;
      if (el.classList.contains("glide__slide")) return el;
      return findSlideElement(el.parentElement);
    };
    const slideElement = findSlideElement(cardRef.current);
    if (!slideElement) return;
    const observer = new MutationObserver(() => {
      setIsCenter(slideElement.classList.contains("glide__slide--active"));
    });


   observer.observe(slideElement, {
     attributes: true,
     attributeFilter: ["class"],
   });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Link to={movieUrl}>
      <div
        ref={cardRef}
        className={`cursor-pointer transform flex flex-col items-center ${
          isCenter ? "scale-100 z-20" : "scale-85 opacity-80 hover:opacity-100 "
        }`}
        style={{ width: "100%" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Poster*/}
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
          {!isCenter && !isHovered && (
            <div className="absolute inset-0 bg-black opacity-10" />
          )}
        </div>

        {/* Information */}
        <div className="mt-3 text-center text-white space-y-1 w-[220px]">
          <h3 className="text-md md:text-lg font-bold text-white">
            {movie.title}
          </h3>
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
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}{" "}
            / 10
          </p>
          {/* <FavoriteButton movie={movie} /> */}
        </div>
      </div>
    </Link>
  );
};

export default PosterCard;
