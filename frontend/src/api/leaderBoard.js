import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/';

const getLeaderBoard = async () => {
    try {
        const response = await axios.get(`${API_URL}/leaderboard`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Backend returned status code', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
    }
    console.error('Error config:', error.config);
    throw error; // Re-throw the error if needed
};

export default getLeaderBoard;