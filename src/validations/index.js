const db = require('../services/database');
const bcrypt = require('bcrypt');

const validateNameField = (req, res, next) => {
  const { nome } = req.body;

  if (!nome) {
    return res
      .status(400)
      .json({ message: 'Todos os campos são obrigatórios!' });
  }
  next();
};

const validateEmailField = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Todos os campos são obrigatórios!' });
  }

  next();
};

const validatePasswordField = (req, res, next) => {
  const { senha } = req.body;

  if (!senha) {
    return res
      .status(400)
      .json({ message: 'Todos os campos são obrigatórios!' });
  }

  next();
};

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await db.getUserByEmail(email);

    if (existingUser.rowCount > 0) {
      return res.status(400).json({
        menssage: 'Já existe usuário cadastrado com o e-mail informado.',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const checkEmailDontExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await db.getUserByEmail(email);

    if (existingUser.rowCount === 0) {
      return res
        .status(400)
        .json({ menssage: 'Usuário e/ou senha inválido(s).' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const validatePassword = async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    const user = await db.getUserByEmail(email);
    const validPassword = await bcrypt.compare(senha, user.rows[0].senha);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Usuário e/ou senha inválido(s).' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const userEmailEdit = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (email !== req.user.email) {
      const emailQuery = await db.getUserByEmail(email);
      if (emailQuery.rowCount > 0) {
        return res
          .status(400)
          .json({ message: 'O email fornecido já está em uso.' });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const validateIdParameter = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Informe um id válido.' });
  }

  next();
};

const validateTransactionFields = async (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({
        message: 'Todos os campos obrigatórios devem ser informados.',
      });
    }

    const categoriaQuery = await db.getCategoryById(categoria_id);

    if (categoriaQuery.rowCount === 0) {
      return res.status(400).json({ message: 'Categoria não encontrada.' });
    }

    if (tipo !== 'saida' && tipo !== 'entrada') {
      return res
        .status(400)
        .json({ message: `O campo tipo deve receber 'saida' ou 'entrada'.` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const validadeIdTransaction = async (req, res, next) => {
  const { id } = req.params;

  try {
    const transactionValidation = await db.getTransactionByUserId(
      id,
      req.user.id,
    );

    if (transactionValidation.rowCount === 0) {
      return res.status(404).json({ message: 'Transação não encontrada.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  validateEmailField,
  validateNameField,
  validatePasswordField,
  checkEmailExists,
  checkEmailDontExists,
  validatePassword,
  userEmailEdit,
  validateIdParameter,
  validateTransactionFields,
  validadeIdTransaction,
};
