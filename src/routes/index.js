const routes = require('express').Router();
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const categoryRouter = require('./categoryRouter');
const transactionRouter = require('./transactionRouter');

routes.use('/login', loginRouter);
routes.use('/usuario', userRouter);
routes.use('/categoria', categoryRouter);
routes.use('/transacao', transactionRouter);

module.exports = routes;
