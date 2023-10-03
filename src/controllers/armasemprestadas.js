const { HttpHelper } = require('../utils/http-helper');
const { ArmaEmprestadaModel } = require('../models/arma-emprestada-model');
const { ArmaModel } = require('../models/arma-model');
const { UserModel } = require('../models/user-model');
const { Op } = require('sequelize');

class ArmaEmprestadaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { numero_de_serie } = request.body;
            if (!numero_de_serie) {
                return response.status(400).json({ error: 'O campo numero_de_serie é obrigatório.' });
            }
            if (typeof numero_de_serie !== 'string' || numero_de_serie.trim() === '') {
                return response.status(400).json({ error: 'O campo numero_de_serie deve ser uma string não vazia.' });
            }
            const userId = request.user.id;

            // Verificando se o usuário já possui uma arma emprestada
            const userHasEmprestada = await ArmaEmprestadaModel.findOne({
                where: { userId, data_devolucao: { [Op.gt]: new Date() } },
            });

            if (userHasEmprestada) {
                return httpHelper.badRequest('Usuário já possui uma arma emprestada.');
            }

            // Consultando a arma com base no número de série fornecido
            const arma = await ArmaModel.findOne({ where: { numero_de_serie } });

            if (!arma) {
                return httpHelper.notFound('Arma não encontrada.');
            }

            // Verificando se a arma já está emprestada
            const armaEmprestada = await ArmaEmprestadaModel.findOne({
                where: { armaId: arma.id, data_devolucao: null },
            });

            if (armaEmprestada) {
                return httpHelper.badRequest('Arma já está emprestada.');
            }

            // Criando um registro de empréstimo de arma
            const emprestimo = await ArmaEmprestadaModel.create({
                userId,
                armaId: arma.id,
                data_emprestimo: new Date(),
            });

            emprestimo.data_devolucao = new Date();
            emprestimo.data_devolucao.setDate(emprestimo.data_devolucao.getDate() + 2);
            await emprestimo.save();

            return httpHelper.ok({ message: 'Arma emprestada com sucesso.', emprestimo });
        } catch (error) {
            console.error('Erro ao criar arma emprestada:', error);
            return response.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }



    async delete(request, response) {
        const httpHelper = new HttpHelper(response);


        try {
            const userId = request.user.id; // Obtem o ID do usuário do objeto request.user

            // Verificando se o usuário tem uma arma emprestada
            const armaEmprestada = await ArmaEmprestadaModel.findOne({
                where: { userId, data_devolucao:  { [Op.gt]: new Date() } },
            });

            if (!armaEmprestada) {
                return httpHelper.badRequest('O usuário não possui uma arma emprestada para devolver.');
            }

            await armaEmprestada.destroy();

            return httpHelper.ok({ message: 'Arma devolvida com sucesso.' });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const armasEmprestadas = await ArmaEmprestadaModel.findAll({
                include: [
                    {
                        model: UserModel,
                        attributes: ['nome', 'matricula'],
                        as: 'usuario', // Renomeando o alias para 'usuario'
                    },
                    {
                        model: ArmaModel,
                        attributes: ['numero_de_serie', 'modelo', 'marca'],
                        as: 'arma', // Renomeando o alias para 'arma'
                    },
                ],
                attributes:['id', 'data_emprestimo', 'data_devolucao', 'status', 'observacoes'],
            })
            return httpHelper.ok({ armasEmprestadas });
            }


         catch (error) {
            return httpHelper.internalError(error);
        }
    }



    async update(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
          const { numero_de_serie } = request.params; // Obtém o número de série da arma a ser atualizada
          const { status, observacoes } = request.body; // Dados a serem atualizados

          // Verifique se a arma emprestada com o número de série fornecido pertence ao usuário
          const userId = request.user.id;
          const armaEmprestada = await ArmaEmprestadaModel.findOne({
            where: { userId },
            include: [
                {
                    model: ArmaModel,
                    as:'arma',
                    where: { numero_de_serie: numero_de_serie }
            }
            ],
          });
          console.log('Arma Emprestada:', armaEmprestada);

          if (!armaEmprestada) {
            return httpHelper.notFound('Arma emprestada não encontrada para o usuário.');
          }

          // Atualize as informações adicionais da arma emprestada
          await armaEmprestada.update({ status, observacoes });

          return httpHelper.ok({ message: 'Informações adicionais da arma emprestada atualizadas com sucesso.', armaEmprestada });
        } catch (error) {
          return httpHelper.internalError(error);
        }
      }


}

module.exports = { ArmaEmprestadaController };//
