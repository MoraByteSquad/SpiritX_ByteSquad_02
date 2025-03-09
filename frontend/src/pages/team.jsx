import React, { useState } from 'react';
import { User } from 'lucide-react';

const players = [
  {
    id: 1,
    name: 'Player One',
    role: 'Batsman',
    stats: 'Runs: 500, Average: 40.0',
    selected: true,
  },
  {
    id: 2,
    name: 'Player Two',
    role: 'Bowler',
    stats: 'Wickets: 20, Economy: 5.0',
    selected: false,
  },
  {
    id: 3,
    name: 'Player Three',
    role: 'All-Rounder',
    stats: 'Runs: 300, Wickets: 15',
    selected: true,
  },
  {
    id: 4,
    name: 'Player Four',
    role: 'Wicketkeeper',
    stats: 'Catches: 50, Stumpings: 10',
    selected: false,
  },
];

export default function TeamPage() {
  // Filter out only the selected players
  const selectedPlayers = players.filter(player => player.selected);

  return (
    <div className="bg-gradient-to-r from-maroon-600 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Meet Your Selected Players
          </h2>
          <p className="mt-6 text-lg text-gray-200">
            These are the players you've selected for your team! They bring their best skills to the game.
          </p>
        </div>
        {/* Display selected players or "No Player Added" message */}
        {selectedPlayers.length > 0 ? (
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {selectedPlayers.map((player) => (
              <li key={player.id}>
                <div className="flex items-center gap-x-6 p-4 bg-black/60 rounded-lg hover:bg-black/80 transition-all">
                  <div className="w-16 h-16 bg-maroon-500 rounded-full flex justify-center items-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-white">{player.name}</h3>
                    <p className="text-sm font-semibold text-red-500">{player.role}</p>
                    <p className="text-xs text-gray-300">{player.stats}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-200">No Player Added</p>
        )}
      </div>
    </div>
  );
}
