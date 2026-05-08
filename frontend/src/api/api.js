import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true, // Essencial para o Django reconhecer a sessão/cookies
});

export default api;