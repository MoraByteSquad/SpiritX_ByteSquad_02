import React, { useState, useEffect } from "react";
import { Delete, Edit, Save, AddCircle, Person } from "@mui/icons-material";
import { getPlayers,getPlayer, createPlayer, updatePlayer, deletePlayer } from '../api/team';  // Import API functions

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: "", category: "", university: "" });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getPlayers();  // Fetch data from API
        console.log(response);  // Log the entire response for inspection
        
        // Check if the response is successful and if 'data' is an array
        if (response.success && Array.isArray(response.data)) {
          setPlayers(response.data);  // Access the `data` field from the response
        } else {
          console.error('Error: Expected an array in `data` field but got', response.data);
          setPlayers([]);  // Fallback to an empty array if the data is invalid
        }
      } catch (error) {
        console.error('Error fetching players:', error.message);
        setPlayers([]);  // Fallback to an empty array if there is an error
      }
    };

    fetchPlayers();
  }, []);

 

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      // Ensure the stats object is updated properly
      const updatedData = {
       // ...formData, // Spread the current player data
        stats: {
          total_runs: Number(formData.stats['Total Runs']),  // Map "Total Runs" to total_runs
          balls_faced: Number(formData.stats['Balls Faced']), // Map "Balls Faced" to balls_faced
          innings_played: Number(formData.stats['Innings Played']), // Map "Innings Played" to innings_played
          wickets: Number(formData.stats['Wickets']),  // Map "Wickets" to wickets
          overs_bowled: Number(formData.stats['Overs Bowled']), // Map "Overs Bowled" to overs_bowled
          runs_conceded: Number(formData.stats['Runs Conceded']), // Map "Runs Conceded" to runs_conceded
        },
      };
  
      console.log("Updating player:", formData._id, updatedData);
      const response = await updatePlayer(formData._id, updatedData); // API call to update player
      
      if (response && response.success) {
        setPlayers(players.map((p) => (p._id === response.data._id ? response.data : p))); // Update UI with the response data
        setSelectedPlayer(response.data); // Update selected player details
        setEditMode(false); // Exit edit mode
      } else {
        console.error("Error: Unexpected response format", response);
      }
    } catch (error) {
      console.error("Error saving player:", error.message);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayer(id);  // Delete player via API
        setPlayers(players.filter((p) => p._id !== id));  // Remove player from local state
        setSelectedPlayer(null);
      } catch (error) {
        console.error('Error deleting player:', error.message);
      }
    }
  };

  const handleAddPlayer = async () => {
    if (!newPlayer.name || !newPlayer.category || !newPlayer.university) {
      alert("Please fill out all fields!");
      return;
    }
  
    try {
      console.log("Adding player:", newPlayer);
      const response = await createPlayer(newPlayer);  // API call
      
      if (response && response.success && response.data) {
        setPlayers([...players, response.data]);  // Update UI with new player
        setNewPlayer({ name: "", category: "", university: "" });  // Reset form
        setShowAddForm(false);  // Hide the form after adding
        alert("Player added successfully!");
      } else {
        console.error("Error: Player creation failed, unexpected response", response);
      }
    } catch (error) {
      console.error("Error adding player:", error.message);
    }
  };
  
  const handlePlayerClick = async (player) => {
  setSelectedPlayer(null);  // Clear any previously selected player
  try {
    const playerDetails = await getPlayer(player._id);  // Fetch player details by ID
    if (playerDetails.success) {
      setSelectedPlayer(playerDetails.data);  // Set the full player details into the state
      setFormData({ ...playerDetails.data });  // Set the form data for editing
    } else {
      console.error("Error fetching player details:", playerDetails.message);
    }
  } catch (error) {
    console.error("Error fetching player:", error.message);
  }
};

  

  return (
    <div className="bg-black/50 text-white p-3 my-2 ml-1 mr-2 ring-4 ring-white/50 rounded-sm h-screen flex-col items-center">
      <h1 className="text-3xl text-red-600 font-bold mb-4">Player Stats</h1>

      {/* Container for the player tabs */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {players.map((player) => (
          <div
            key={player._id}  // Use _id from the API response
            className="bg-gradient-to-r from-red-800 via-maroon-700 to-black p-4 rounded-lg text-white relative flex items-center justify-between cursor-pointer transition-all transform hover:scale-105 hover:bg-red-600"
            onClick={() => handlePlayerClick(player)}
          >
            <div className="flex items-center">
              <Person fontSize="large" className="mr-2" /> {/* Person Icon */}
              <span className="text-lg font-semibold">{player.name}</span>
            </div>
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent player click
                  handleDelete(player._id);  // Use _id for delete
                }}
                className="absolute top-2 right-2 bg-red-700 px-2 py-1 rounded hover:bg-red-800"
              >
                <Delete fontSize="small" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Player Details */}
     {/* Modal for Player Details */}
     {selectedPlayer && (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-black bg-opacity-70 absolute inset-0" onClick={() => setSelectedPlayer(null)}></div>
    <div className="bg-gray-900 p-6 rounded-lg relative w-3/4 max-w-3xl">
      <button
        onClick={() => setSelectedPlayer(null)}
        className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded"
      >
        Close
      </button>

      {/* Display Player Name or Allow Editing */}
      {editMode ? (
        <input
          className="bg-gray-800 p-2 text-white w-full mb-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      ) : (
        <h2 className="text-xl font-bold">{selectedPlayer.name}</h2>
      )}

      {/* Display Player Category */}
      <p className="text-gray-400">Category: {selectedPlayer.category}</p>

      {/* Display Stats */}
      <h3 className="text-lg font-semibold mt-4">Stats:</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {Object.entries(formData.stats).map(([key, value]) => (
          <div key={key} className="p-2 bg-gray-800 rounded">
            <span className="font-bold text-orange-500">{key.replace('_', ' ').toUpperCase()}: </span>
            {editMode ? (
              <input
                className="bg-gray-700 p-1 text-white w-16"
                type="number"
                value={value}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...formData.stats, [key]: e.target.value }, // Update the stat when changed
                  })
                }
              />
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Admin Controls: Edit / Save */}
      {isAdmin && (
        <div className="mt-4 flex justify-between items-center">
          {editMode ? (
            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              onClick={handleSave}  // Calls the save function
            >
              <Save fontSize="small" /> Save
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              onClick={handleEdit}  // Switches to edit mode
            >
              <Edit fontSize="small" /> Edit
            </button>
          )}
        </div>
      )}
    </div>
  </div>
)}



      {isAdmin && (
        <div className="mt-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-red-800 via-maroon-700 to-black px-4 py-2 rounded hover:bg-red-600 text-white"
          >
            {showAddForm ? "Cancel" : "Add Player"}
            <AddCircle fontSize="small" />
          </button>
          {showAddForm && (
            <div className="mt-4 bg-gray-800 p-4 rounded">
              <input
                className="bg-gray-700 p-2 text-white w-full mb-2"
                placeholder="Player Name"
                value={newPlayer.name}
                onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
              />
              <input
                className="bg-gray-700 p-2 text-white w-full mb-2"
                placeholder="Category"
                value={newPlayer.category}
                onChange={(e) => setNewPlayer({ ...newPlayer, category: e.target.value })}
              />
              <input
                className="bg-gray-700 p-2 text-white w-full mb-2"
                placeholder="University"
                value={newPlayer.university}
                onChange={(e) => setNewPlayer({ ...newPlayer, university: e.target.value })}
              />
              <button
                onClick={handleAddPlayer}
                className="bg-gradient-to-r from-red-800 via-maroon-700 to-black px-4 py-2 rounded hover:bg-red-600 text-white"
              >
                ADD Player
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Players;
