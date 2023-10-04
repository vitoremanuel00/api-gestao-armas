const { HttpHelper } = require('../utils/http-helper');
const { ArmaModel } = require('../models/arma-model');
const { Validates } = require('../utils/validates');
const { Sequelize } = require('sequelize');

const configDatabase = require('../database/config');
const sequelize = new Sequelize(configDatabase);

class ArmaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
          const { nome_arma, modelo, marca, numero_de_serie } = request.body;

          if (!nome_arma || !numero_de_serie) {
            return httpHelper.badRequest('Parâmetros inválidos!');
          }

          // Verificar se o número de série já existe
          const existingArma = await ArmaModel.findOne({
            where: { numero_de_serie },
          });

          if (existingArma) {
            return httpHelper.badRequest('Número de série já está em uso. Escolha um número de série único.');
          }

          if (modelo) {
            const modeloIsValid = Validates.validModelo(modelo);
            if (!modeloIsValid) {
              return httpHelper.badRequest('Modelo de arma inválido!');
            }
          }

          const arma = await ArmaModel.create({
            nome_arma,
            modelo,
            marca,
            numero_de_serie,
          });

          return httpHelper.created(arma);
        } catch (error) {
          return httpHelper.internalError(error);
        }
      }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const armas = await ArmaModel.findAll();
            return httpHelper.ok(armas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const armaExists = await ArmaModel.findOne({ where: { id } });
            if (!armaExists) return httpHelper.notFound('Arma não encontrada!');
            await ArmaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Arma deletada com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { nome_arma, modelo, marca, numero_de_serie } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            if (modelo) {
                const modeloIsValid = Validates.validModelo(modelo);
                if (!modeloIsValid) return httpHelper.badRequest('Modelo inválido!');
            }
            const armaExists = await ArmaModel.findByPk(id);
            if (!armaExists) return httpHelper.notFound('Arma não encontrada!');
            await ArmaModel.update({
                nome_arma, modelo, marca, numero_de_serie
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Arma atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async ModelosdeArmas (request, response){
        const httpHelper = new HttpHelper(response);
        try{
            const modelos = await ArmaModel.findAll({
            attributes: [
                'modelo',
            [sequelize.fn('COUNT', sequelize.col('*')),'quantidadeArmas'],
            ],
            group: ['modelo'],
        });
            return httpHelper.ok(modelos);
        } catch(error){
            return httpHelper.internalError(error);
        }

      }

    //   async batalhoesCR(request, response) {
    //     const httpHelper = new HttpHelper(response);
    //     try {
    //         const batalhao_CR = await BatalhaoModel.findAll({
    //             attributes: [
    //             'comando_regional', // Substitua pelo nome correto do campo que identifica o Comando Regional
    //             [sequelize.fn('COUNT', sequelize.col('*')), 'quantidadeBatalhoes'],
    //             ],
    //             group: ['comando_regional'], // Substitua pelo nome correto do campo que identifica o Comando Regional
    //         });
    //         return httpHelper.ok(batalhao_CR);
    //     } catch (error) {
    //         return httpHelper.internalError(error);
    //     }
    // }

}

module.exports = { ArmaController };
