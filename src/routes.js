const { Router, request } = require('express');


const { ArmaController } = require('./controllers/arma');
const { UserController } = require('./controllers/user');
const { ArmaEmprestadaController } = require('./controllers/armasemprestadas');
const { authMiddleware } = require('./middleware/auth-middleware');


const routes = Router();


const armaController = new ArmaController();
const userController = new UserController();
const armasemprestadas = new ArmaEmprestadaController();


routes.post('/arma', authMiddleware, armaController.create);//para criar armas
routes.get('/armas', authMiddleware, armaController.getAll);//para ver armas
routes.delete('/arma/:id', authMiddleware, armaController.delete);//para deletar armas
routes.put('/arma/:id', authMiddleware, armaController.update);//para editar armas


routes.post('/register', userController.register);
routes.post('/login', userController.login);


routes.post('/emprestar', authMiddleware, armasemprestadas.post);
routes.delete('/arma-devolucao', authMiddleware,armasemprestadas.devolverArma);
routes.get('/listaremprestimos', authMiddleware,armasemprestadas.listarArmasEmprestadas);
routes.put('/arma-emprestada/:numeroDeSerie', authMiddleware, armasemprestadas.atualizarArmaEmprestada);



module.exports = { routes };
