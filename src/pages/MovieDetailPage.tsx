import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../api/api";
import { Video, MovieDetailResult, CreditResponse, Review } from "../api/types";
import { useLayoutLoadingStore } from "../stores/useLayoutLoadingStore";
import ProfilePlaceholder from "../assets/Default_pfp.svg";
import { shortDescription } from "../utils/shortDescription";
import { useSearchStore } from "../stores/useSearchStore";

const MovieDetailPage = () => {
  const { slugId } = useParams<{ slugId: string }>();
  const id = slugId?.split("-").pop();

  const [trailer, setTrailer] = useState<Video | null>(null);
  const [movieDetail, setMovieDetail] = useState<MovieDetailResult | null>(
    null
  );
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLayoutLoadingStore();
  const [reviews, setReviews] = useState<Review[]>([]);
   const [expandedMap, setExpandedMap] = useState<{ [key: string]: boolean }>(
     {}
   );
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

  const { title, runtime, adult, release_date, overview, vote_average } =
    movieDetail;

  const rating = adult ? "R" : "PG";

  const castList = credits?.cast?.slice(0, 10) || [];
  const crewList =
    credits?.crew?.filter((member) =>
      ["Director", "Producer"].includes(member.job)
    ) || [];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* trailer */}
      {trailer ? (
        <div className="w-full aspect-video">
          <iframe
            title={trailer.name}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
          <p>No trailer available</p>
        </div>
      )}

      {/* movie title*/}
      <div className="p-6">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      {/* movie basic info*/}
      <div className="flex flex-col md:flex-row justify-between gap-8 p-6">
        <div className="space-y-4 md:w-1/2">
          <p>
            <strong>Runtime:</strong> {runtime} min
          </p>
          <p>
            <strong>Rated:</strong> {rating}
          </p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Overview</h2>
          <p className="text-gray-300">{overview}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Rating</h2>
        <p className="text-2xl text-yellow-400">
          {vote_average.toFixed(1)} / 10
        </p>
      </div>

      {/* Reviews */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Audience Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-400 text-lg">No reviews found</p>
        ) : (
          reviews.slice(0, 3).map((review) => {
            const isExpanded = expandedMap[review.id] ?? false;
            const { content, isTruncated } = shortDescription(
              review.content,
              200
            );

            return (
              <div key={review.id} className="border-b border-gray-700 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-md font-bold">{review.author}</p>
                  {review.author_details.rating !== null && (
                    <p className="text-yellow-400">
                      {review.author_details.rating} / 10
                    </p>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-200">
                  {isExpanded ? review.content : content}
                </p>
                {isTruncated && (
                  <button
                    onClick={() =>
                      setExpandedMap((prev) => ({
                        ...prev,
                        [review.id]: !isExpanded,
                      }))
                    }
                    className="mt-1 text-blue-400 hover:underline text-sm"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
        {/* Cast */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {castList.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : ProfilePlaceholder
                }
                alt={actor.name}
                className="rounded-lg w-24 h-32 object-cover mx-auto mb-2"
              />
              <p className="text-sm font-bold">{actor.name}</p>
              <p className="text-xs text-gray-400">as {actor.character}</p>
            </div>
          ))}
        </div>

        {/* Crew */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {crewList.map((crew, idx) => (
            <div key={`${crew.id}-${idx}`} className="text-center">
              <img
                src={
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w185${crew.profile_path}`
                    : ProfilePlaceholder
                }
                alt={crew.name}
                className="rounded-lg w-24 h-32 object-cover mx-auto mb-2"
              />
              <p className="text-sm font-bold">{crew.name}</p>
              <p className="text-xs text-gray-400">{crew.job}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home */}
      <div className="p-6">
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
