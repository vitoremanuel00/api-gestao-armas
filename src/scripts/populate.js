require('../database');

const { ArmaModel } = require('../models/arma-model');

const armas = [
    {
        nome_arma: 'g15',
        marca: 'Glock',
        modelo: 'Pistola',
        numero_de_serie: '123',
    },
    {
        nome_arma: 'AK47',
        marca: 'Kalashinikov',
        modelo: 'Fuzil',
        numero_de_serie: '124',
    },
    {
        nome_arma: 'AK47',
        marca: 'Kalashinikov',
        modelo: 'Fuzil',
        numero_de_serie: '125',
    },
    {
        nome_arma: 'Spas12',
        marca: 'Spas',
        modelo: 'Escopeta',
        numero_de_serie: '126',
    },
    {
        nome_arma: 'Spas12',
        marca: 'Spas',
        modelo: 'Escopeta',
        numero_de_serie: '127',
    },
    {
        nome_arma: 'g15',
        marca: 'Glock',
        modelo: 'Pistola',
        numero_de_serie: '130',
    }


];

(async () => {
    for (let arma of armas) {
        await ArmaModel.create({
            nome_arma: arma.nome_arma,
            marca: arma.marca,
            modelo: arma.modelo,
            numero_de_serie: arma.numero_de_serie,
        });
    }
    console.log('Armas cadastradas no estoque!');
})();

