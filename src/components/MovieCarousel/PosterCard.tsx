import React, { useEffect, useRef, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import { MovieSummary } from "../../api/types";
import { getImageUrl } from "../../utils/image";

interface PosterCardProps {
  movie: MovieSummary;
}

const PosterCard = ({ movie }: PosterCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (cardRef.current) {
        setIsCenter(
          cardRef.current.parentElement?.classList.contains(
            "glide__slide--active"
          ) ?? false
        );
      }
    });

    if (cardRef.current?.parentElement) {
      observer.observe(cardRef.current.parentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
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
        <img
          loading="lazy"
          src={
            movie.poster_path
              ? getImageUrl(movie.poster_path, "w500")
              : "/default-poster.png"
          }
          alt={movie.title}
          className="w-full h-full object-cover rounded-xl bg-red-600"
        />
        {!isCenter && !isHovered && (
          <div className="absolute inset-0 bg-black opacity-50" />
        )}
      </div>

      {/* Information */}
      <div className="mt-3 text-center text-white space-y-1 w-[220px]">
        <h3 className="text-md md:text-lg font-bold text-red-500 truncate">
          {movie.title}
        </h3>
        <p className="text-sm md:text-base text-gray-300">
          {new Date(movie.release_date).toLocaleString("default", {
            year: "numeric",
            month: "long",
          })}{" "}
          • {movie.adult ? "R" : "PG"}
        </p>
        <p className="text-sm md:text-base text-yellow-400">
          {movie.vote_average.toFixed(1)} / 10
        </p>
        <FavoriteButton movieId={movie.id} />
      </div>
    </div>
  );
};

export default PosterCard;
