const routes = require('express').Router();

// Controllers
const {
  getUserTransactions,
  getTransactionById,
  createTransaction,
  editTransaction,
  removeTransaction,
  getTransactionsStatement,
} = require('../controllers/transactionController');

// Validations
const {
  validateIdParameter,
  validateTransactionFields,
  validadeIdTransaction,
} = require('../validations/index');

routes.get('/', getUserTransactions);
routes.get('/extrato', getTransactionsStatement);
routes.get('/:id', validateIdParameter, getTransactionById);
routes.post('/', validateTransactionFields, createTransaction);
routes.put(
  '/:id',
  validateIdParameter,
  validadeIdTransaction,
  validateTransactionFields,
  editTransaction,
);
routes.delete(
  '/:id',
  validateIdParameter,
  validadeIdTransaction,
  removeTransaction,
);

module.exports = routes;
