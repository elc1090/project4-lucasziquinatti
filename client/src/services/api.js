import axios from 'axios';

export const api = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://api-zumbi-game-faa13d2d6e39.herokuapp.com',
});

export const registerAccount = async (username, password) => {
    return api.post('/register', {username, password});
}

export const createSession = async (username, password) => {
    return api.post('/login', { username, password });
}

export const verifyToken = async () => {
    return api.get('/verify');
}

export const logoutAccount = async () => {
    return api.get('/logout');
}

export const getRanking = async () => {
    return api.get('/ranking');
}

export const updateAccount = async (user) => {
    return api.post('/update', {userData: user});
}