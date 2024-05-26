import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify({ username: credentials.username }));
    }
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
