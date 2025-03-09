import React, { useState } from 'react';
import { User } from 'lucide-react';

const players = [
  { id: 1, name: 'Player One', position: 'Forward', stats: 'Goals: 10, Assists: 5', selected: false },
  { id: 2, name: 'Player Two', position: 'Midfielder', stats: 'Goals: 3, Assists: 8', selected: false },
  { id: 3, name: 'Player Three', position: 'Defender', stats: 'Tackles: 20, Blocks: 10', selected: false },
];

function SelectTeam() {
  const [team, setTeam] = useState(players);

  const toggleSelection = (id) => {
    setTeam(team.map(player => player.id === id ? { ...player, selected: !player.selected } : player));
  };

  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm min-h-screen flex flex-col items-center overflow-auto w-full">
      <h1 className="text-2xl font-bold mb-4 text-red-500 text-center">Select Your Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl px-4">
        {team.map(player => (
          <div 
            key={player.id} 
            className={`p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center text-center 
              ${player.selected ? 'bg-gradient-to-r from-red-800 via-maroon-700 to-black' : 'bg-gray-900'} 
              hover:bg-red-600 w-full max-w-xs mx-auto`} 
            onClick={() => toggleSelection(player.id)}
          >
            <User className="w-12 h-12 text-white mb-2" />
            <h2 className="text-xl font-bold">{player.name}</h2>
            <p className="text-gray-300">{player.position}</p>
            <p className="text-gray-400">{player.stats}</p>
            <button className={`mt-2 px-4 py-2 rounded text-white transition-all w-full 
              ${player.selected ? 'bg-red-700' : 'bg-black hover:bg-gray-700'}`}>
              {player.selected ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectTeam;
