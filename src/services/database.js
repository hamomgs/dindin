const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});

const createUser = async (nome, email, encryptedPassword) => {
  try {
    const query =
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
    const values = [nome, email, encryptedPassword];
    const { rows } = await pool.query(query, values);

    return rows[0];
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const values = [email];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getUserById = async (id) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const upadateUser = async (nome, email, encryptedPassword, id) => {
  try {
    const query =
      'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4';
    const values = [nome, email, encryptedPassword, id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getCategories = async () => {
  try {
    const query = 'SELECT * FROM categorias';
    const { rowCount, rows } = await pool.query(query);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getFilteredTransactions = async (id, filter) => {
  try {
    const query = `SELECT t.*, c.descricao AS categoria_nome 
      FROM transacoes t 
      LEFT JOIN categorias c ON t.categoria_id = c.id 
      WHERE t.usuario_id = $1 AND c.descricao ILIKE ANY($2::text[])
    `;
    const values = [id, filter];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getAllTransactionsById = async (id) => {
  try {
    const query = `SELECT t.*, c.descricao AS categoria_nome 
      FROM transacoes t 
      LEFT JOIN categorias c ON t.categoria_id = c.id 
      WHERE usuario_id = $1
    `;
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getTransactionById = async (id, userId) => {
  try {
    const query = 'SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2';
    const values = [id, userId];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const createTransaction = async (
  descricao,
  valor,
  data,
  categoria_id,
  tipo,
  id,
) => {
  try {
    const query = `INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const values = [descricao, valor, data, categoria_id, tipo, id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getCategoryNameById = async (id) => {
  try {
    const query =
      'SELECT descricao AS categoria_nome FROM categorias WHERE id = $1';
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const upadateTransaction = async (
  descricao,
  valor,
  data,
  categoria_id,
  tipo,
  id,
) => {
  try {
    const query = `UPDATE transacoes 
      SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 
      WHERE id = $6
    `;
    const values = [descricao, valor, data, categoria_id, tipo, id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const deleteTransaction = async (id) => {
  try {
    const query = 'DELETE FROM transacoes WHERE id = $1';
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getTransactionsInflowSum = async (id) => {
  try {
    const query = `SELECT SUM(valor) as total FROM transacoes WHERE tipo = 'entrada' AND usuario_id = $1`;
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getTransactionsOutflowSum = async (id) => {
  try {
    const query = `SELECT SUM(valor) as total FROM transacoes WHERE tipo = 'saida' AND usuario_id = $1`;
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getCategoryById = async (id) => {
  try {
    const query = 'SELECT * FROM categorias WHERE id = $1';
    const values = [id];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getTransactionByUserId = async (id, userId) => {
  try {
    const query = 'SELECT * FROM transacoes WHERE id = $1 and usuario_id = $2';
    const values = [id, userId];
    const { rowCount, rows } = await pool.query(query, values);

    return { rowCount, rows };
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  upadateUser,
  getCategories,
  getFilteredTransactions,
  getAllTransactionsById,
  getTransactionById,
  createTransaction,
  getCategoryNameById,
  upadateTransaction,
  deleteTransaction,
  getTransactionsInflowSum,
  getTransactionsOutflowSum,
  getCategoryById,
  getTransactionByUserId,
};
