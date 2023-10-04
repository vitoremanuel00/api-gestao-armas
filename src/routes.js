const { Router, request } = require('express');


const { ArmaController } = require('./controllers/arma');
const { UserController } = require('./controllers/user');
const { ArmaEmprestadaController } = require('./controllers/armasemprestadas');
const { authMiddleware } = require('./middleware/auth-middleware');


const routes = Router();


const armaController = new ArmaController();
const userController = new UserController();
const armasemprestadas = new ArmaEmprestadaController();


routes.post('/register', userController.register);
routes.post('/login', userController.login);

routes.post('/arma', authMiddleware, armaController.create);//para criar armas
routes.get('/armas', authMiddleware, armaController.getAll);//para ver armas
routes.delete('/arma/:id', authMiddleware, armaController.delete);//para deletar armas
routes.put('/arma/:id', authMiddleware, armaController.update);//para editar armas
routes.get('/contagemModelos', authMiddleware,armaController.ModelosdeArmas);

routes.post('/emprestar', authMiddleware, armasemprestadas.create);
routes.delete('/arma-devolucao', authMiddleware,armasemprestadas.delete);
routes.get('/listaremprestimos', authMiddleware,armasemprestadas.getAll);
routes.put('/arma-emprestada/:numero_de_serie', authMiddleware, armasemprestadas.update);




module.exports = { routes };
