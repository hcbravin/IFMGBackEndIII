const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'ifmg_livros_api',
    'ifmg',
    'ifmg',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false // Opcional: desabilita logs SQL
    }
);

// Testar conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com banco de dados estabelecida com sucesso.');
    })
    .catch((error) => {
        console.error('Erro ao se conectar ao banco de dados: ', error);
    });

module.exports = sequelize;