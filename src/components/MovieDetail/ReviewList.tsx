import { useState } from "react";
import { Review } from "../../api/types";
import { shortDescription } from "../../utils/shortDescription";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [expandedMap, setExpandedMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (reviews.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Audience Reviews</h2>
        <p className="text-gray-400 text-lg">No reviews found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Audience Reviews</h2>
      {reviews.slice(0, 3).map((review) => {
        const isExpanded = expandedMap[review.id] ?? false;
        const { content, isTruncated } = shortDescription(review.content, 200);

        return (
          <div key={review.id} className="border-b border-gray-700 pb-4 mb-4">
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
      })}
    </div>
  );
};

export default ReviewList;
