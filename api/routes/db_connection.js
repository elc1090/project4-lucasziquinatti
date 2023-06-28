const routes = require('express').Router();
const { verifyToken } = require('../controllers/authController');
const { user_exist, new_user, get_ranking, user_update } = require('../controllers/dbController');

routes.post('/register', user_exist, new_user);

routes.get('/ranking', verifyToken, get_ranking);

routes.post('/update', verifyToken, user_update);

module.exports = routes;