const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

// Definição do modelo Categoria
class Categoria extends Model { }

Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em'
    }
);

// Definição do modelo Livro
class Livro extends Model { }

Livro.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Categoria',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.ENUM('disponivel', 'emprestado'),
            allowNull: false,
            defaultValue: 'disponivel'
        }
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em'
    }
);

// Associação entre Livro e Categoria
Livro.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria'
});

Categoria.hasMany(Livro, {
    foreignKey: 'categoria_id',
    as: 'livros'
});


class Usuario extends Model { } // classe herdando de 'Model'
Usuario.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        nome: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        senha_hash: { type: DataTypes.STRING, allowNull: false },
        perfil: {type: DataTypes.ENUM('usuario','bibliotecario','admin'), allowNull: false, defaultValue: 'usuario'},
    },
    {
        sequelize,
        freezeTableName: true,
        createdAt: 'criada_em',
        updatedAt: 'atualizada_em',
    },
);

Usuario.hasMany(Livro, { foreignKey: 'usuario_id' });
Livro.belongsTo(Usuario, { foreignKey: 'usuario_id' });


// Sincronização com o banco de dados
sequelize.sync({ alter: false }).then(() => { // Utilizar true quando for necessário promover alteração no BD
    console.log('Modelos sincronizados com o banco de dados.');

}).catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados: ', error);
    
});

module.exports = { Categoria, Livro, Usuario };