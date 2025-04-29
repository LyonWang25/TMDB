import { useEffect, useState, useRef } from "react";
import LandingBanner from "../components/LandingBanner";
import { MovieSummary } from "../api/types";
import { useSwipeable } from "react-swipeable";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";


const LandingCarousel = ({ movies }: { movies: MovieSummary[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef<"left" | "right">("right");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    triggerPause();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    triggerPause();
  };

  const goToIndex = (index: number) => {
    directionRef.current = index > currentIndex ? "right" : "left";
    setCurrentIndex(index);
    triggerPause();
  };

  const triggerPause = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, movies.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });


  return (
    <div className="relative w-full overflow-hidden" {...swipeHandlers}>
      <div
        className="flex transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, idx) => (
          <div key={idx} className="w-full flex-shrink-0">
            <LandingBanner
              movieId={movie.id}
              backdropPath={movie.backdrop_path ?? ""}
              title={movie.title}
              description={movie.overview.slice(0, 250) + "..."}
              onAddToWatchlist={() => console.log("Add", movie.id)}
              onMoreInfo={() => console.log("Info", movie.id)}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 cursor-pointer z-30 hidden md:block"
        >
          <MdKeyboardArrowLeft className="text-white" size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 cursor-pointer z-30 hidden md:block"
        >
          <MdKeyboardArrowRight className="text-white" size={24} />
        </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {movies.map((_, idx) => (
          <div
            key={idx}
            onClick={() => goToIndex(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}


export default LandingCarousel;
