const db = require('../services/database');

const getCategories = async (req, res) => {
  try {
    const categoryQuery = await db.getCategories();

    const category = categoryQuery.rows;

    return res.status(200).json(category);
  } catch {
    return res.status(500).json({ messagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  getCategories,
};
