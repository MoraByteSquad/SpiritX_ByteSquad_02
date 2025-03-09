import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white relative">
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        
        {/* Return Home Button */}
        <Link to="/" className="m-6 px-6 py-3 bg-red-900 text-white rounded-lg text-lg hover:bg-red-800 transition">
          Return to Home 🏠
        </Link>
        
        <p className="text-xl mt-2">Oops! You got bowled out. Page not found!</p>
      </div>
    </div>
  );
}

export default NotFound;
