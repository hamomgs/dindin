const routes = require('express').Router();

// Controllers
const {
  createUser,
  getUserProfile,
  editUserProfile,
} = require('../controllers/userController');

// Middlewares
const checkAuthUser = require('../middlewares/userAuth');

// Validations
const {
  userEmailEdit,
  validateNameField,
  validateEmailField,
  validatePasswordField,
  checkEmailExists,
} = require('../validations/index');

routes.post('/', checkEmailExists, createUser);
routes.use(checkAuthUser);
routes.get('/', getUserProfile);
routes.use(validateNameField);
routes.use(validateEmailField);
routes.use(validatePasswordField);
routes.use(userEmailEdit);
routes.put('/', editUserProfile);

module.exports = routes;
