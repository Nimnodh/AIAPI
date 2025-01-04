import axios from 'axios';
import { ACCESS_TOKEN } from './config';

const api = axios.create({ 
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject({
        ...error,
        message: 'Request error',
    })
);

export default api;