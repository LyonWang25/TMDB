import { useEffect, useMemo, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PosterCard from "./PosterCard";
import { MovieSummary } from "../../api/types";

import "@glidejs/glide/dist/css/glide.core.min.css";
import { getImageUrl } from "../../utils/image";

interface MovieCarouselProps {
  movies: MovieSummary[];
}

const GAP = 20;
const VISIBLE_CARDS = 5;
const CLONE_COUNT = Math.floor(VISIBLE_CARDS / 2);

const MovieCarousel = ({ movies }: MovieCarouselProps) => {
  const glideRef = useRef<HTMLDivElement>(null);
  const [glideInstance, setGlideInstance] = useState<Glide | null>(null);
  const [currentCenterIndex, setCurrentCenterIndex] = useState(CLONE_COUNT);

  const extendedMovies = useMemo(() => {
    const prefix = movies.slice(-CLONE_COUNT);
    const suffix = movies.slice(0, CLONE_COUNT);
    return [...prefix, ...movies, ...suffix];
  }, [movies]);

  useEffect(() => {
    if (!glideRef.current || extendedMovies.length === 0) return;

    const glide = new Glide(glideRef.current, {
      type: "carousel",
      perView: VISIBLE_CARDS,
      focusAt: "center",
      gap: GAP,
      animationDuration: 200,
      hoverpause: true,
      breakpoints: {
        1024: { perView: 3 },
        600: { perView: 1 },
      },
    });
    glide.on("mount.after", () => {
      setCurrentCenterIndex(glide.index);
    });
    glide.on("run", () => {
      const index = glide.index;
      setCurrentCenterIndex(index);
    });

    glide.mount();
    setGlideInstance(glide);

    return () => {
      glide.destroy();
    };
  }, [extendedMovies]);
  
  const handleNext = () => {
    glideInstance?.go(">");
  };

  const handlePrev = () => {
    glideInstance?.go("<");
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="mx-auto w-full px-6 px-4">
        <header className="flex flex-wrap justify-between gap-x-12 border-b-2 pb-2 pt-8"
          style={{
            borderColor: "#94a6ab",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Movies at the cinema
          </h2>
        </header>
      </div>
      {extendedMovies[currentCenterIndex] && (
        <img
          alt="Background"
          loading="lazy"
          src={getImageUrl(
            extendedMovies[currentCenterIndex].backdrop_path,
            "original"
          )}
          className="blur-md pointer-events-none absolute inset-0 -z-10 block h-full w-full object-cover opacity duration-200 ease-in-out opacity-50"
        ></img>
      )}
      {/* mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black opacity-50"></div>
      {/* movie carousel */}
      <div ref={glideRef} className="glide py-14">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {extendedMovies.map((movie, i) => (
              <li key={i} className="glide__slide flex justify-center">
                <PosterCard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
        {/* buttons control */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/50 hover:bg-gray-700/80 rounded-full p-2 cursor-pointer"
          type="button"
        >
          <FaChevronLeft className="text-md md:text-xl text-white/80" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/50 hover:bg-gray-700/80 rounded-full p-2 cursor-pointer"
          type="button"
        >
          <FaChevronRight className="text-md md:text-xl text-white/80" />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
