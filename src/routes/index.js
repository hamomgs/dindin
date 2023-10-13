const routes = require('express').Router();
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const categoryRouter = require('./categoryRouter');
const transactionRouter = require('./transactionRouter');

// Middlewares
const checkAuthUser = require('../middlewares/userAuth');

// Validations
const {
  validateEmailField,
  validatePasswordField,
  checkEmailDontExists,
  validatePassword,
} = require('../validations/index');

routes.use(
  '/login',
  validateEmailField,
  validatePasswordField,
  checkEmailDontExists,
  validatePassword,
  loginRouter,
);
routes.use('/usuario', userRouter);
routes.use('/categoria', checkAuthUser, categoryRouter);
routes.use('/transacao', checkAuthUser, transactionRouter);

module.exports = routes;
