import { CreditResponse } from "../../api/types";
import ProfilePlaceholder from "../../assets/Default_pfp.svg";

interface CastAndCrewProps {
  credits: CreditResponse | null;
}

const CastAndCrew = ({ credits }: CastAndCrewProps) => {
  if (!credits) return null;

  const castList = credits.cast?.slice(0, 10) || [];
  const crewList =
    credits.crew?.filter((member) =>
      ["Director", "Producer"].includes(member.job)
    ) || [];

  return (
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
  );
};

export default CastAndCrew;
