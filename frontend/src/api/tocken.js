import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const getTokenData = async () => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('No token found in session storage');
        }

        const decodedToken = jwtDecode(token);
        
        
        return {
            decodedToken,
          
        };
    } catch (error) {
        throw new Error(`Error decoding token or fetching data: ${error.message}`);
    }
};

export default getTokenData;