const db = require('../services/database');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

const encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);

  return encryptedPassword;
};

const createUser = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;

  try {
    const encryptedPassword = await encryptPassword(password);

    const newUser = await db.createUser(name, email, encryptedPassword);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db.getUserByEmail(email);

    const token = jwt.create({ id: user.rows[0].id });

    const { senha: _, ...userLoggedIn } = user.rows[0];

    return res.status(200).json({ usuario: userLoggedIn, token });
  } catch (error) {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

const getUserProfile = (req, res) => {
  const { senha: _, ...userLoggedIn } = req.user;

  return res.status(200).json(userLoggedIn);
};

const editUserProfile = async (req, res) => {
  const { nome: name, email, senha: password } = req.body;
  try {
    const encryptedPassword = await encryptPassword(password);

    await db.upadateUser(name, email, encryptedPassword, req.user.id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  createUser,
  login,
  getUserProfile,
  editUserProfile,
};
