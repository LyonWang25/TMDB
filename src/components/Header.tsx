import React from "react";
import { Link } from "react-router-dom";
import AmcLogo from "../assets/AMC_Theatres_logo.svg";

const Header = () => {
  return (
    <div className="bg-black text-white px-6 py-2 flex justify-between items-center">
      <Link
        to="/"
        className="py-2"
      >
        <img src={AmcLogo} alt="AMC Logo" className="w-20" />
      </Link>
      <span className="mx-4">Welcome</span>
      <Link
        to="/watchlist"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Watchlist
      </Link>
    </div>
  );
};

export default Header;
