import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../api/api";
import { Video, MovieDetailResult, CreditResponse, Review } from "../api/types";
import { useLayoutLoadingStore } from "../stores/useLayoutLoadingStore";
import { useSearchStore } from "../stores/useSearchStore";
//Components
import Trailer from "../components/MovieDetail/Trailer";
import MovieInfo from "../components/MovieDetail/MovieInfo";
import RatingSection from "../components/MovieDetail/RatingSection";
import ReviewList from "../components/MovieDetail/ReviewList";
import CastAndCrew from "../components/MovieDetail/CastAndCrew";
import { convertToMovieSummary } from "../types/movie";

const MovieDetailPage = () => {
  const { slugId } = useParams<{ slugId: string }>();
  const id = slugId?.split("-").pop();

  const [trailer, setTrailer] = useState<Video | null>(null);
  const [movieDetail, setMovieDetail] = useState<MovieDetailResult | null>(
    null
  );
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { setLoading } = useLayoutLoadingStore();
  const [error, setError] = useState<string | null>(null);

  const clearSearchQuery = useSearchStore((state) => state.clearSearchQuery);

  useEffect(() => {
    clearSearchQuery();
  }, [clearSearchQuery]);

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [videoRes, movieRes, creditRes, reviewRes] = await Promise.all([
          API.getMovieVideos(Number(id)),
          API.getMovieDetail(Number(id)),
          API.getMovieCredits(Number(id)),
          API.getMovieReviews(Number(id)),
        ]);

        const trailers = videoRes.data.results.filter(
          (video: Video) => video.site === "YouTube" && video.type === "Trailer"
        );

        setTrailer(trailers.length > 0 ? trailers[0] : null);
        setMovieDetail(movieRes.data);
        setCredits(creditRes.data);
        setReviews(reviewRes.data.results);

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!setLoading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (error || !movieDetail) {
    return <div className="text-white p-8">{error || "Movie not found."}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* trailer */}
      <Trailer trailer={trailer} />

      {/* movie basic info*/}
      <MovieInfo
        title={movieDetail.title}
        runtime={movieDetail.runtime}
        adult={movieDetail.adult}
        releaseDate={movieDetail.release_date}
        overview={movieDetail.overview}
        movie={convertToMovieSummary(movieDetail)}
      />

      {/* Rating */}
      <RatingSection rating={movieDetail.vote_average} />

      {/* Reviews */}
      <ReviewList reviews={reviews} />

      {/* Cast & Crew */}
      <CastAndCrew credits={credits} />

      {/* Back to Home */}
      <div className="p-6 text-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MovieDetailPage;
