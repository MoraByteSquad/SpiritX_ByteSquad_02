import React, { useState } from "react";

const staticPlayers = [
  {
    id: 1,
    name: "Player 1",
    category: "Batsman",
    stats: {
      "Total Runs": 1500,
      "Balls Faced": 1200,
      "Innings Played": 50,
      "Wickets": 10,
      "Overs Bowled": 50,
      "Runs Conceded": 200,
    },
  },
  {
    id: 2,
    name: "Player 2",
    category: "Bowler",
    stats: {
      "Total Runs": 800,
      "Balls Faced": 600,
      "Innings Played": 30,
      "Wickets": 25,
      "Overs Bowled": 120,
      "Runs Conceded": 150,
    },
  },
];

const PlayerStats = () => {
  const [players, setPlayers] = useState(staticPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: "", category: "" });

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setFormData({ ...player });
    setEditMode(false);
  };

  const handleEdit = () => setEditMode(true);
  const handleSave = () => {
    setPlayers(players.map((p) => (p.id === formData.id ? formData : p)));
    setSelectedPlayer(formData);
    setEditMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      setPlayers(players.filter((p) => p.id !== id));
      setSelectedPlayer(null);
    }
  };

  const handleAddPlayer = () => {
    const newPlayerData = {
      id: players.length + 1,
      name: newPlayer.name,
      category: newPlayer.category,
      stats: {
        "Total Runs": 0,
        "Balls Faced": 0,
        "Innings Played": 0,
        "Wickets": 0,
        "Overs Bowled": 0,
        "Runs Conceded": 0,
      },
    };
    setPlayers([...players, newPlayerData]);
    setNewPlayer({ name: "", category: "" });
    setShowAddForm(false);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl text-red-600 font-bold mb-4">Player Stats</h1>
      <div className="flex gap-4 flex-wrap">
        {players.map((player) => (
          <div key={player.id} className="bg-orange-600 p-3 rounded-lg text-white relative flex items-center gap-2">
            <button onClick={() => handlePlayerClick(player)}>{player.name} ({player.category})</button>
            {isAdmin && (
              <button
                onClick={() => handleDelete(player.id)}
                className="bg-red-700 px-2 rounded hover:bg-red-800 ml-2"
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedPlayer && (
        <div className="bg-gray-900 p-6 mt-4 rounded-lg relative">
          <button onClick={() => setSelectedPlayer(null)} className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded">Close</button>
          {editMode ? (
            <input
              className="bg-gray-800 p-2 text-white w-full mb-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
          )}

          <p className="text-gray-400">Category: {selectedPlayer.category}</p>
          <h3 className="text-lg font-semibold mt-4">Stats:</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(selectedPlayer.stats).map(([key, value]) => (
              <div key={key} className="p-2 bg-gray-800 rounded">
                <span className="font-bold text-orange-500">{key}: </span>
                {editMode ? (
                  <input
                    className="bg-gray-700 p-1 text-white w-16"
                    type="number"
                    value={formData.stats[key]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stats: { ...formData.stats, [key]: e.target.value },
                      })
                    }
                  />
                ) : (
                  <span>{value}</span>
                )}
              </div>
            ))}
          </div>

          {isAdmin && (
            <div className="mt-4">
              {editMode ? (
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded" onClick={handleSave}>Save</button>
              ) : (
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded" onClick={handleEdit}>Edit</button>
              )}
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="mt-6">
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600">
            {showAddForm ? "Cancel" : "Add Player"}
          </button>
          {showAddForm && (
            <div className="mt-4 bg-gray-800 p-4 rounded">
              <input className="bg-gray-700 p-2 text-white w-full mb-2" placeholder="Player Name" value={newPlayer.name} onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })} />
              <input className="bg-gray-700 p-2 text-white w-full mb-2" placeholder="Category" value={newPlayer.category} onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })} />
              <button onClick={handleAddPlayer} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Save Player</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerStats;