import React, { useState } from 'react';
import { User, Trash2 } from 'lucide-react';




export default function TeamPage() {
  
  const [players, setPlayers] = useState(initialPlayers);
  
  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const selectedPlayers = players.filter(player => player.selected);

  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm min-h-screen flex flex-col items-center w-full">
      <h1 className='text-3xl font-bold m-3 mb-8 text-center uppercase'>Meet Your Selected Players</h1>
      
      <div className="w-full max-w-2xl bg-white/10 rounded-md p-4 space-y-3">
        {selectedPlayers.length > 0 ? (
          selectedPlayers.map(player => (
            <div key={player.id} className="flex justify-between items-center p-4 rounded-md text-lg transition-all bg-black/30 hover:bg-red-600">
              <div className="flex items-center space-x-4">
                <User className="w-10 h-10 text-white" />
                <div>
                  <h2 className="text-xl font-bold">{player.name}</h2>
                  <p className="text-gray-300">{player.role}</p>
                  <p className="text-gray-400">{player.stats}</p>
                </div>
              </div>
              <button onClick={() => deletePlayer(player.id)} className={`bg-red-700 hover:bg-red-800 text-white p-2 rounded-md transition-all `}>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-200">No Player Added</p>
        )}
      </div>
    </div>
  );
}
