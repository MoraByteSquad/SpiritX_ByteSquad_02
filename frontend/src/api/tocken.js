import axios from 'axios';
import jwtDecode from 'jwt-decode';

const getTokenData = async () => {
    try {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            throw new Error('No token found in session storage');
        }

        const decodedToken = jwtDecode(token);
        const response = await axios.get('/your-api-endpoint', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            decodedToken,
            data: response.data
        };
    } catch (error) {
        throw new Error(`Error decoding token or fetching data: ${error.message}`);
    }
};

export default getTokenData;