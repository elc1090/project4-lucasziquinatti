const routes = require('express').Router();
const { verifyToken } = require('../controllers/authController');
const { user_exist, new_user, get_ranking } = require('../controllers/dbController');

routes.post('/register', user_exist, new_user);

routes.get('/ranking', verifyToken, get_ranking);

module.exports = routes;