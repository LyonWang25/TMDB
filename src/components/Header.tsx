import { Link, useLocation, useNavigate } from "react-router-dom";
import AmcLogo from "../assets/AMC_Theatres_logo.svg";
import { useSearchStore } from "../stores/useSearchStore";
import { ImCancelCircle } from "react-icons/im";


const Header = () => {
  const location = useLocation();
  const isWatchlistPage = location.pathname.startsWith("/watchlist");
  const { searchQuery, setSearchQuery } = useSearchStore();
  const navigate = useNavigate();

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);

      if (location.pathname !== "/" && newQuery.trim().length > 0) {
        navigate("/");
      }
    };

  return (
    <div className="bg-black text-white px-6 py-2 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link to="/" className="py-2">
        <img src={AmcLogo} alt="AMC Logo" className="w-20" />
      </Link>

      {/* Search Input */}
      
        <div className="relative w-full max-w-xs flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <ImCancelCircle size={20} className="text-white"/>
            </button>
          )}
        </div>
      

      {/* Watchlist Link */}
      {!isWatchlistPage && (
        <Link
          to="/watchlist"
          className="text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Watchlist
        </Link>
      )}
    </div>
  );
};

export default Header;
