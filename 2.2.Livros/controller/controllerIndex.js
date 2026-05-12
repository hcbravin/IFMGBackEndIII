// importação da classe que gerencia as notas na memória
const { Livro, Categoria } = require('../model/modelos.js')

// cria e já exporta a função que será responsável pela tela principal
exports.tela_principal = async function (req, res) {
    try {

        // Ira cria as categorias padroes
        const AllCategorias = await Categoria.findAll();
        if (AllCategorias.length == 0) {
            await Categoria.bulkCreate([
                { nome: 'Informática' },
                { nome: 'Romance' },
                { nome: 'Fantasia' },
                { nome: 'Ficção' },
                { nome: 'Drama' },
                { nome: 'Aventura' },
                { nome: 'Suspense' },
                { nome: 'Terror' },
                { nome: 'Biografia' },
                { nome: 'Autoajuda' }
            ]);
        }

        // filtro por categoria
        const id_categoria_filtro = req.query.categoria;
        const nome_categoria_filtro = req.query.nome;

        // undefined para quando nao for passado nenhum filtro e os demais valores para quando for passado
        if ((!id_categoria_filtro == undefined) && (isNaN(id_categoria_filtro) || id_categoria_filtro <= 0)) {
            return res.status(400).send('ID da categoria inválido');
        }

        // lista todas as Livros utilizando o método do Sequelize
        const Livros = await Livro.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }],
            where: id_categoria_filtro !== undefined ? { categoria_id: id_categoria_filtro } : {}
        });
        // const Livros = await Livro.findAll({
        //     include: [{
        //         model: Categoria,
        //         as: 'categoria',
        //         attributes: ['id', 'nome']
        //     }]
        // });

        // formata a data de criação de cada Livro para o formato brasileiro
        Livros.forEach(Livro => {
            Livro.criada_em_fmt = new Date(Livro.criada_em).toLocaleDateString('pt-BR');
            Livro.status_btn = Livro.status == 'disponivel' ? true : false;
        });

        const contexto = {
            titulo_pagina: 'BiboLivro: Biblioteca do Bairro',
            livros: Livros,
            categorias: AllCategorias,
            categorias_filtro: ((!isNaN(id_categoria_filtro) && id_categoria_filtro > 0) ? true : false),
            categorias_filtro_nome: nome_categoria_filtro
        };

        // renderiza o arquivo index.hbs, dentro da pasta view
        return res.render('index', contexto);

    } catch (error) {
        console.error('Erro ao listar Livros:', error);
        return res.status(500).send('Erro ao listar Livros');
    }
}