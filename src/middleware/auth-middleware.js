const jwt = require('jsonwebtoken');

const { HttpHelper } = require('../utils/http-helper');

const authMiddleware = async (request, response, next) => {
    try {
      const token = request.headers.authorization.split(' ')[1]; // Obtém o token do cabeçalho

      // Verifica o token usando o JWT
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      // Adiciona o ID do usuário ao objeto de solicitação para uso posterior
      request.user = { id: decodedToken.id };

      console.log('Usuário autenticado:', request.user); // Adicione esta linha para depuração

      next(); // Continua para a próxima função de middleware ou controlador
    } catch (error) {
      // Lida com erros de autenticação, como token inválido ou ausente
      return response.status(401).json({ error: 'Falha na autenticação.' });
    }
  };

module.exports = { authMiddleware };
