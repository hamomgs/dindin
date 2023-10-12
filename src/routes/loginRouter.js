const routes = require('express').Router();
const { login } = require('../controllers/userController');

routes.post('/', login);

module.exports = routes;
