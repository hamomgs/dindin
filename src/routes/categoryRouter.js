const routes = require('express').Router();
const { getCategories } = require('../controllers/categoryController');

routes.get('/', getCategories);

module.exports = routes;
