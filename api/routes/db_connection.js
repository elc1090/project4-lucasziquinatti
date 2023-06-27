const routes = require('express').Router();
const { user_exist, new_user } = require('../controllers/dbController');

routes.post('/register', user_exist, new_user);

module.exports = routes;