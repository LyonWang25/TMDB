import { Video } from "../../api/types";

interface TrailerProps {
  trailer: Video | null;
}

const Trailer = ({ trailer }: TrailerProps) => {
  if (!trailer) {
    return (
      <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
        <p>No trailer available</p>
      </div>
    );
  }

  return (
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
  );
};

export default Trailer;
