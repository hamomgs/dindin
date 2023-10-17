const db = require('../services/database');
const bcrypt = require('bcrypt');

const validateNameField = (req, res, next) => {
  const { nome: name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios!' });
  }
  next();
};

const validateEmailField = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios!' });
  }

  next();
};

const validatePasswordField = (req, res, next) => {
  const { senha: password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios!' });
  }

  next();
};

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingUser = await db.getUserByEmail(email);

    if (existingUser.rowCount > 0) {
      return res.status(400).json({
        mensagem: 'Já existe usuário cadastrado com o e-mail informado.',
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
        .json({ mensagem: 'Usuário e/ou senha inválido(s).' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const validatePassword = async (req, res, next) => {
  const { email, senha: password } = req.body;

  try {
    const user = await db.getUserByEmail(email);
    const validPassword = await bcrypt.compare(password, user.rows[0].senha);

    if (!validPassword) {
      return res
        .status(400)
        .json({ mensagem: 'Usuário e/ou senha inválido(s).2' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ messagem: 'Internal server error.' });
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
          .json({ mensagem: 'O email fornecido já está em uso.' });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Internal server error.' });
  }
};

const validateIdParameter = (req, res, next) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'Informe um id válido.' });
  }

  next();
};

const validateTransactionFields = async (req, res, next) => {
  const {
    descricao: description,
    valor: value,
    data: date,
    categoria_id: id_category,
    tipo: type,
  } = req.body;

  try {
    if (!description || !value || !date || !id_category || !type) {
      return res.status(400).json({
        mensagem: 'Todos os campos obrigatórios devem ser informados.',
      });
    }

    const categoryQuery = await db.getCategoryById(id_category);

    if (categoryQuery.rowCount === 0) {
      return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
    }

    if (type !== 'saida' && type !== 'entrada') {
      return res
        .status(400)
        .json({ mensagem: `O campo tipo deve receber 'saida' ou 'entrada'.` });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Internal server error.' });
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
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: 'Internal server error.' });
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
