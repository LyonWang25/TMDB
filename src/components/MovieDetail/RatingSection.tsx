interface RatingSectionProps {
  rating: number;
}

const RatingSection = ({ rating }: RatingSectionProps) => {
  return (
    <div className="p-6">
      <h2 className="text-l md:text-xl font-bold mb-2">Rating</h2>
      <p className="text-l md:text-xl text-yellow-400">{rating.toFixed(1)} / 10</p>
    </div>
  );
};

export default RatingSection;
