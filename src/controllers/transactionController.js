const db = require('../services/database');

const getUserTransactions = async (req, res) => {
  const { filtro: filter } = req.query;
  const userId = req.user.id;

  try {
    let transactions;
    if (filter) {
      transactions = await db.getFilteredTransactions(userId, filter);
    } else {
      transactions = await db.getAllTransactionsById(userId);
    }

    return res.status(200).json(transactions.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transactionQuery = await db.getTransactionById(id, req.user.id);

    if (transactionQuery.rowCount === 0) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    const transaction = transactionQuery.rows[0];

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

const createTransaction = async (req, res) => {
  const {
    descricao: description,
    valor: value,
    data: date,
    categoria_id: id_category,
    tipo: type,
  } = req.body;

  try {
    const transactionQuery = await db.createTransaction(
      description,
      value,
      date,
      id_category,
      type,
      req.user.id,
    );
    const transaction = transactionQuery.rows[0];
    const categoryName = await db.getCategoryNameById(id_category);

    transaction.categoria_nome = categoryName.rows[0].categoria_nome;

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

const editTransaction = async (req, res) => {
  const { id } = req.params;
  const {
    descricao: description,
    valor: value,
    data: date,
    categoria_id: id_category,
    tipo: type,
  } = req.body;

  try {
    await db.upadateTransaction(
      description,
      value,
      date,
      id_category,
      type,
      id,
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

const removeTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteTransaction(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

const getTransactionsStatement = async (req, res) => {
  try {
    const inflowQuery = await db.getTransactionsInflowSum(req.user.id);
    const outflowQuery = await db.getTransactionsOutflowSum(req.user.id);
    const inflow = Number(inflowQuery.rows[0].total) || 0;
    const outflow = Number(outflowQuery.rows[0].total) || 0;

    return res.status(200).json({ entrada: inflow, saida: outflow });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
  }
};

module.exports = {
  getUserTransactions,
  getTransactionById,
  createTransaction,
  editTransaction,
  removeTransaction,
  getTransactionsStatement,
};
