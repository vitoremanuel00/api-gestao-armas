
const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password, matricula, nome } = request.body;
            if (!email || !password || !matricula || !nome) {
                return httpHelper.badRequest('Todos os campos são obrigatórios!');
            }

            const userByEmail = await UserModel.findOne({ where: { email } });
            if (userByEmail) {
                return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            }

            const userByMatricula = await UserModel.findOne({ where: { matricula } });
            if (userByMatricula) {
                return httpHelper.badRequest('Matrícula já cadastrada!');
            }

            const passwordHashed = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            );
            const user = await UserModel.create({
                email,
                password: passwordHashed,
                matricula,
                nome,
            });
            if (!user) {
                return httpHelper.badRequest('Houve um erro ao criar usuário');
            }
            const accessToken = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, matricula, password } = request.body;

            if ((!email && !matricula) || !password) {
                return httpHelper.badRequest('E-mail, matrícula e senha são obrigatórios.');
            }

            let userExists;

            if (email) {
                userExists = await UserModel.findOne({ where: { email } });
            } else {
                userExists = await UserModel.findOne({ where: { matricula } });
            }

            if (!userExists) {
                return httpHelper.notFound('Usuário não encontrado.');
            }

            const isPasswordValid = await bcrypt.compare(password, userExists.password);

            if (!isPasswordValid) {
                return httpHelper.badRequest('Senha incorreta.');
            }

            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );

            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async put(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
          const { id } = request.params;
          const userId = request.user.id;
          const { novaDataDevolucao } = request.body;

          // Encontre o registro de empréstimo de arma com base no ID
          const emprestimo = await ArmaEmprestadaModel.findByPk(id);

          // Verifique se o registro existe
          if (!emprestimo) {
            return httpHelper.notFound('Empréstimo de arma não encontrado.');
          }

          // Verifique se o registro pertence ao usuário
          if (emprestimo.userId !== userId) {
            return httpHelper.forbidden('Você não tem permissão para atualizar este empréstimo de arma.');
          }

          // Atualize a data de devolução com o novo valor
          emprestimo.data_devolucao = novaDataDevolucao;

          // Salve as alterações no banco de dados
          await emprestimo.save();

          return httpHelper.ok({ message: 'Data de devolução atualizada com sucesso.', emprestimo });
        } catch (error) {
          return httpHelper.internalError(error);
        }
      }
      

}


module.exports = { UserController };
