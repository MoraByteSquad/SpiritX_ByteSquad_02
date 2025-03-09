import axios from 'axios';
// import getTokenData from './tocken';  

// Define base URL for your API
const API_URL = 'http://localhost:8000/api/v1/player';

export const getPlayers = async () => {
    try {
        // Assuming `getTokenData` returns the token properly or handles it
        // const token = sessionStorage.getItem('token');  // Get JWT token from sessionStorage
        // if (!token) {
        //     throw new Error("No token found");
        // }

        const response = await axios.get(`${API_URL}/get-players`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,  // Pass token in the header
            // }
        });

        if (response.data.success) {
            console.log('Players:', response.data);  // Log the response data
            return response.data;  // If success, return the data
        } else {
            throw new Error('Failed to fetch players');
        }

    } catch (error) {
        console.error('Error fetching players:', error.message);
        return { success: false, message: error.message, data: [] };  // Return a fallback object
    }
};
// Function to create a new player (POST request)
export const createPlayer = async (playerData) => {
  try {
    console.log('playerData:', playerData);
    const response = await axios.post(`${API_URL}/create-player`, playerData, {
        headers: {
            'Content-Type': 'application/json'
          },
   });

    if (response.data && response.data.success) {
      return response.data.data; // Return newly created player
    } else {
      throw new Error('Player creation failed.');
    }
  } catch (error) {
    console.error('Error creating player:', error.message);
    throw error;
  }
};
// Function to update a player (PUT request)
export const updatePlayer = async (id, updatedData) => {
    try {
       
        const response = await axios.put(`${API_URL}/update-player/${id}`, updatedData, {
            
                headers: { 'Content-Type': 'application/json' }, // Pass JWT token in Authorization header
            
        });

        return response.data;  // Return the updated player data
    } catch (error) {
        console.error('Error updating player:', error.message);
        throw error;  // Handle error accordingly
    }
};

// Function to delete a player (DELETE request)
export const deletePlayer = async (id) => {
    try {
       
        const response = await axios.delete(`${API_URL}/delete-player/${id}`, {
            headers: {
                'Content-Type': 'application/json'
              },
        });

        return response.data;  // Return the success message after deletion
    } catch (error) {
        console.error('Error deleting player:', error.message);
        throw error;  // Handle error accordingly
    }
};
