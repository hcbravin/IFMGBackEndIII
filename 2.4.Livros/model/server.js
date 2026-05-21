const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(
    'ifmg_demandas_ti', //nome da base de dados
    'ifmg', // nome do usuário do banco de dados
    'ifmg', // senha do usuário
    {
        host: 'localhost', // endereço do BD
        dialect: 'mysql' // dialeto do BD
    }
);

sequelize.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida com sucesso.');
    
}).catch((error) => {
    console.error('Erro ao se conectar ao banco de dados: ', error);
});

module.exports = sequelize; //exportar