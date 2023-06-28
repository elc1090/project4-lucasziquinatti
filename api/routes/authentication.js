const routes = require('express').Router();
const { login, verifyToken, updatePassword, logout, returns } = require('../controllers/authController');
const { find_user } = require('../controllers/dbController');

routes.post('/login', find_user, login);
routes.get('/verify', verifyToken, returns);
// routes.post('/update', verifyToken, updatePassword);
routes.get('/logout', logout);

module.exports = routes;