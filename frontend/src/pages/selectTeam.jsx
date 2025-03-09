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
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm min-h-screen flex flex-col items-center w-full">
      <h1 className='text-3xl font-bold m-3 mb-8 text-center uppercase'>Select Your Team</h1>
      
      {/* Players List */}
      <ul className="w-full max-w-2xl bg-white/10 rounded-md p-4 space-y-3">
        {team.map(player => (
          <li 
            key={player.id} 
            className={`flex justify-between items-center p-4 rounded-md text-lg cursor-pointer transition-all 
              ${player.selected ? 'bg-gradient-to-r from-red-800 via-maroon-700 to-black' : 'bg-black/30'} 
              hover:bg-red-600`} 
            onClick={() => toggleSelection(player.id)}
          >
            <div className="flex items-center space-x-4">
              <User className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-bold">{player.name}</h2>
                <p className="text-gray-300">{player.position}</p>
                <p className="text-gray-400">{player.stats}</p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded text-white transition-all 
              ${player.selected ? 'bg-red-700' : 'bg-black hover:bg-gray-700'}`}> 
              {player.selected ? 'Selected' : 'Select'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectTeam;