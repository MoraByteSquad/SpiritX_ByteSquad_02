import React, { useState } from 'react';

const staticPlayers = [
  {
    id: 1,
    name: 'Player 1',
    university: 'University A',
    category: 'Batsman',
    stats: {
      "Total Runs": 1500,
      "Balls Faced": 1200,
      "Innings Played": 50,
      "Wickets": 10,
      "Overs Bowled": 50,
      "Runs Conceded": 200
    }
  },
  {
    id: 2,
    name: 'Player 2',
    university: 'University B',
    category: 'Bowler',
    stats: {
      "Total Runs": 800,
      "Balls Faced": 600,
      "Innings Played": 30,
      "Wickets": 25,
      "Overs Bowled": 120,
      "Runs Conceded": 150
    }
  }
];

const PlayerManagement = () => {
  const [players, setPlayers] = useState(staticPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
    setSelectedPlayer(null);
  };

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Player Management</h1>
      <div className="flex gap-4">
        <div className="w-1/4">
          {players.map((player) => (
            <div
              key={player.id}
              onClick={() => handlePlayerClick(player)}
              className="cursor-pointer bg-gray-800 p-4 rounded-lg mb-2 hover:bg-orange-600 transition"
            >
              {player.name}
            </div>
          ))}
        </div>
        <div className="w-3/4">
          {selectedPlayer && (
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold">{selectedPlayer.name}</h2>
              <p className="text-gray-400">University: {selectedPlayer.university}</p>
              <p className="text-gray-400">Category: {selectedPlayer.category}</p>
              <h3 className="text-xl mt-4">Stats</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {Object.entries(selectedPlayer.stats).map(([stat, value]) => (
                  <div key={stat} className="bg-gray-700 p-2 rounded">
                    <strong>{stat}:</strong> {value}
                  </div>
                ))}
              </div>
              {isAdmin && (
                <button 
                  onClick={() => handleDeletePlayer(selectedPlayer.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Delete Player
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerManagement;