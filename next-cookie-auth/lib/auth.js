import axios from 'axios';

// Require cookie
axios.defaults.withCredentials = true;

export const loginUser = (email, password) => {
    return axios.post('/api/login', {
        email,
        password
    });
}

export const getUserProfile = () => {
    return axios.get('/api/profile');
}