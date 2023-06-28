import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const registerAccount = async (username, password) => {
    return api.post('/register', {username, password});
}

export const createSession = async (username, password) => {
    return api.post('/login', { username, password });
}

export const logoutAccount = async () => {
    return api.get('/logout');
}

export const getRanking = async () => {
    return api.get('/ranking');
}