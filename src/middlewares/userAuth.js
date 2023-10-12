const db = require('../services/database');
const jwt = require('../services/jwt');

const checkAuthUser = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({
      mensagem:
        'Para acessar este recurso um token de autenticação válido deve ser enviado.',
    });
  }

  const token = bearer.split(' ')[1];

  try {
    const userDecoded = jwt.getUser(token);

    const { rows, rowCount } = await db.getUserById(userDecoded.id);
    
    if (rowCount === 0) {
      return res.status(401).json({ mensagem: 'Não autorizado!' });
    }

    req.user = rows[0];

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não autorizado.' });
  }
};

module.exports = checkAuthUser;
