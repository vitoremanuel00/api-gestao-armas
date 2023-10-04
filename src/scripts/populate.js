require('../database');

const { ArmaModel } = require('../models/arma-model');

const armas = [
    /*{
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
*/
{
    nome_arma: 'P226',
    marca: 'SIG Sauer',
    modelo: 'Pistola',
    numero_de_serie: '142',
},
{
    nome_arma: 'M1 Garand',
    marca: 'Springfield Armory',
    modelo: 'Fuzil',
    numero_de_serie: '143',
},
{
    nome_arma: 'Benelli M4',
    marca: 'Benelli',
    modelo: 'Escopeta',
    numero_de_serie: '144',
},
{
    nome_arma: 'Desert Eagle',
    marca: 'Magnum Research',
    modelo: 'Pistola',
    numero_de_serie: '145',
},
{
    nome_arma: 'AK-74',
    marca: 'Kalashnikov',
    modelo: 'Fuzil',
    numero_de_serie: '146',
},
{
    nome_arma: 'Winchester 1300',
    marca: 'Winchester',
    modelo: 'Escopeta',
    numero_de_serie: '147',
},
{
    nome_arma: 'M1911',
    marca: 'Colt',
    modelo: 'Pistola',
    numero_de_serie: '148',
},
{
    nome_arma: 'SCAR-H',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '149',
},
{
    nome_arma: 'Mossberg 590',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '150',
},
{
    nome_arma: 'Glock 17',
    marca: 'Glock',
    modelo: 'Pistola',
    numero_de_serie: '151',
},
{
    nome_arma: 'AK-12',
    marca: 'Kalashnikov',
    modelo: 'Fuzil',
    numero_de_serie: '152',
},
{
    nome_arma: 'Benelli Nova',
    marca: 'Benelli',
    modelo: 'Escopeta',
    numero_de_serie: '153',
},
{
    nome_arma: 'M9',
    marca: 'Beretta',
    modelo: 'Pistola',
    numero_de_serie: '154',
},
{
    nome_arma: 'F2000',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '155',
},
{
    nome_arma: 'Saiga-12',
    marca: 'Izhmash',
    modelo: 'Escopeta',
    numero_de_serie: '156',
},
{
    nome_arma: 'CZ 75',
    marca: 'CZ',
    modelo: 'Pistola',
    numero_de_serie: '157',
},
{
    nome_arma: 'Steyr AUG',
    marca: 'Steyr Mannlicher',
    modelo: 'Fuzil',
    numero_de_serie: '158',
},
{
    nome_arma: 'Remington 1100',
    marca: 'Remington',
    modelo: 'Escopeta',
    numero_de_serie: '159',
},
{
    nome_arma: 'Walther PPK',
    marca: 'Walther',
    modelo: 'Pistola',
    numero_de_serie: '160',
},
{
    nome_arma: 'AUG A3',
    marca: 'Steyr Mannlicher',
    modelo: 'Fuzil',
    numero_de_serie: '161',
},
{
    nome_arma: 'Mossberg 930',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '162',
},
{
    nome_arma: 'Beretta 92',
    marca: 'Beretta',
    modelo: 'Pistola',
    numero_de_serie: '163',
},
{
    nome_arma: 'HK416',
    marca: 'Heckler & Koch',
    modelo: 'Fuzil',
    numero_de_serie: '164',
},
{
    nome_arma: 'Ithaca 37',
    marca: 'Ithaca Gun Company',
    modelo: 'Escopeta',
    numero_de_serie: '165',
},
{
    nome_arma: 'SIG P320',
    marca: 'SIG Sauer',
    modelo: 'Pistola',
    numero_de_serie: '166',
},
{
    nome_arma: 'FN FAL',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '167',
},
{
    nome_arma: 'Winchester 1897',
    marca: 'Winchester',
    modelo: 'Escopeta',
    numero_de_serie: '168',
},
{
    nome_arma: 'CZ 97',
    marca: 'CZ',
    modelo: 'Pistola',
    numero_de_serie: '169',
},
{
    nome_arma: 'AK-74M',
    marca: 'Kalashnikov',
    modelo: 'Fuzil',
    numero_de_serie: '170',
},
{
    nome_arma: 'Benelli M2',
    marca: 'Benelli',
    modelo: 'Escopeta',
    numero_de_serie: '171',
},
{
    nome_arma: 'Smith & Wesson M&P',
    marca: 'Smith & Wesson',
    modelo: 'Pistola',
    numero_de_serie: '172',
},
{
    nome_arma: 'Steyr AUG A1',
    marca: 'Steyr Mannlicher',
    modelo: 'Fuzil',
    numero_de_serie: '173',
},
{
    nome_arma: 'Remington 870 Express',
    marca: 'Remington',
    modelo: 'Escopeta',
    numero_de_serie: '174',
},
{
    nome_arma: 'Springfield XD',
    marca: 'Springfield Armory',
    modelo: 'Pistola',
    numero_de_serie: '175',
},
{ //sub
    nome_arma: 'FN SCAR-L',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '176',
},
{
    nome_arma: 'Mossberg 835',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '177',
},
{
    nome_arma: 'CZ P-09',
    marca: 'CZ',
    modelo: 'Pistola',
    numero_de_serie: '178',
},
{
    nome_arma: 'AKS-74U',
    marca: 'Kalashnikov',
    modelo: 'Fuzil',
    numero_de_serie: '179',
},
{
    nome_arma: 'Winchester Model 12',
    marca: 'Winchester',
    modelo: 'Escopeta',
    numero_de_serie: '180',
},
{
    nome_arma: 'Beretta 96',
    marca: 'Beretta',
    modelo: 'Pistola',
    numero_de_serie: '181',
},
{
    nome_arma: 'HK G36',
    marca: 'Heckler & Koch',
    modelo: 'Fuzil',
    numero_de_serie: '182',
},
{
    nome_arma: 'Mossberg 505 Youth',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '183',
},
{
    nome_arma: 'Walther PPQ',
    marca: 'Walther',
    modelo: 'Pistola',
    numero_de_serie: '184',
},
{
    nome_arma: 'FN PS90',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '185',
},
{
    nome_arma: 'Benelli Super Nova',
    marca: 'Benelli',
    modelo: 'Escopeta',
    numero_de_serie: '186',
},
{
    nome_arma: 'Ruger SR9',
    marca: 'Ruger',
    modelo: 'Pistola',
    numero_de_serie: '187',
},
{
    nome_arma: 'Steyr AUG A2',
    marca: 'Steyr Mannlicher',
    modelo: 'Fuzil',
    numero_de_serie: '188',
},
{
    nome_arma: 'Remington VersaMax',
    marca: 'Remington',
    modelo: 'Escopeta',
    numero_de_serie: '189',
},
{
    nome_arma: 'Smith & Wesson M&P Shield',
    marca: 'Smith & Wesson',
    modelo: 'Pistola',
    numero_de_serie: '190',
},
{
    nome_arma: 'IWI Tavor X95',
    marca: 'IWI',
    modelo: 'Fuzil',
    numero_de_serie: '192',
},
{
    nome_arma: 'Mossberg 930 SPX',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '193',
},
{
    nome_arma: 'CZ 75 SP-01',
    marca: 'CZ',
    modelo: 'Pistola',
    numero_de_serie: '194',
},
{
    nome_arma: 'FN Five-seveN',
    marca: 'FN Herstal',
    modelo: 'Pistola',
    numero_de_serie: '195',
},
{
    nome_arma: 'AK-101',
    marca: 'Kalashnikov',
    modelo: 'Fuzil',
    numero_de_serie: '196',
},
{
    nome_arma: 'Mossberg 930 JM Pro Series',
    marca: 'Mossberg',
    modelo: 'Escopeta',
    numero_de_serie: '197',
},
{
    nome_arma: 'Walther PPS',
    marca: 'Walther',
    modelo: 'Pistola',
    numero_de_serie: '198',
},
{
    nome_arma: 'FN SCAR-H PR',
    marca: 'FN Herstal',
    modelo: 'Fuzil',
    numero_de_serie: '199',
},
{
    nome_arma: 'Remington 11-87',
    marca: 'Remington',
    modelo: 'Escopeta',
    numero_de_serie: '200',
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

