import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="separator-sidebar"
        className={`z-10 w-64 h-screen transition-transform m-2 rounded-sm ring-4 ring-white/50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50/50  dark:bg-black/50 backdrop-blur-lg`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/team"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Team Select - Users Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path fillRule="evenodd" d="M4 13a4 4 0 014-4h4a4 4 0 014 4v1H4v-1z" clipRule="evenodd" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Team Select</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/budget"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Budget - Currency Dollar Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9V7a1.25 1.25 0 012.5 0v2a1.25 1.25 0 01-2.5 0zm0 4v-1a1.25 1.25 0 012.5 0v1a1.25 1.25 0 01-2.5 0z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Budget</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Leaderboard - Chart Bar Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h3a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM9 7a1 1 0 011-1h3a1 1 0 011 1v9a1 1 0 01-1 1h-3a1 1 0 01-1-1V7zM16 3a1 1 0 011-1h3a1 1 0 011 1v13a1 1 0 01-1 1h-3a1 1 0 01-1-1V3z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Leaderboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/players"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Edit Players - Pencil Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 13.5V17h3.5l9.293-9.293-3.5-3.5L2 13.5z" clipRule="evenodd" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Players</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/selectTeam"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Edit Players - Pencil Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 13.5V17h3.5l9.293-9.293-3.5-3.5L2 13.5z" clipRule="evenodd" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Select Team Members</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/performanceSummery"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive
                      ? "border bg-red-500/20 border-red-200 dark:border-red-800"
                      : "text-gray-100 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }`
                }
              >
                {/* Edit Players - Pencil Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 13.5V17h3.5l9.293-9.293-3.5-3.5L2 13.5z" clipRule="evenodd" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Performance Summery</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
