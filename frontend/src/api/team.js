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

export const getPlayer = async (id) => {
    try {
        // Construct the URL with the specific player ID
        const response = await axios.get(`${API_URL}/get-player/${id}`, {
            // You can include JWT token in headers if needed
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // }
        });

        if (response.data.success) {
            console.log('Player:', response.data);  // Log the response data
            return response.data;  // If success, return the data
        } else {
            throw new Error('Failed to fetch player');
        }

    } catch (error) {
        console.error('Error fetching player:', error.message);
        return { success: false, message: error.message, data: null };  // Return a fallback object
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
         console.log('updatedData:', id, updatedData);
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


export const getTournamentSummary = async () => {
    try {
      // Assuming you may need a token, you can uncomment the lines below to fetch it if required
      // const token = sessionStorage.getItem('token');  // Get JWT token from sessionStorage
      // if (!token) {
      //   throw new Error("No token found");
      // }
  //http://localhost:8000/api/v1/player/get-tournament-summary
      const response = await axios.get(`${API_URL}/get-tournament-summary`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,  // Uncomment to pass token in the header if necessary
        // }
      });
  
      if (response.data) {
        console.log('Tournament Summary:', response.data);  // Log the response data
        return response.data;  // If success, return the data
      } else {
        throw new Error('Failed to fetch tournament summary');
      }
  
    } catch (error) {
      console.error('Error fetching tournament summary:', error.message);
      return { success: false, message: error.message, data: {} };  // Return a fallback object
    }
  };

  export const getRemainingBudget = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/get-remaining-budget/${userId}`);
  
      if (response.data.success) {
        console.log('Remaining budget:', response.data);
        return response.data;  // Return remaining budget data
      } else {
        throw new Error('Failed to fetch remaining budget');
      }
    } catch (error) {
      console.error('Error fetching remaining budget:', error.message);
      return { success: false, message: error.message, data: null };  // Return fallback object
    }
  };
  

