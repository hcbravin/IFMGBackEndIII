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

exports.historia = async function (req, res) {
    const contexto = {
        titulo_pagina: 'Nossa História',
    };
    
    // Configurações de cache:
    // - Pode ser armazenada em servidores intermediários (public)
    // - Tempo de validade: 6 meses (15778476 segundos ≈ 6 meses)
    // - Navegador deve sempre revalidar com o servidor usando Etag (must-revalidate)
    // - Força verificação no servidor mesmo com cache válido (no-cache = revalidação)
    res.set('Cache-Control', 'public, max-age=15778476, must-revalidate, no-cache');

    // Express gera Etag automaticamente
    return res.render('historia', contexto);
}

exports.faq = async function (req, res) {
    const contexto = {
        titulo_pagina: 'FAQ: Perguntas Frequentes',
    };
    
    // Configurações de cache:
    // - Armazenada APENAS no navegador web (private)
    // - Não pode ser armazenada em servidores intermediários ou CDN
    // - Tempo de validade: 1 ano (31536000 segundos)
    // - Navegador NÃO precisa consultar o servidor (immutable)
    // - Conteúdo é considerado imutável durante o período de cache
    res.set('Cache-Control', `private, max-age=31536000, immutable`);

    // Express gera Etag automaticamente
    return res.render('faq', contexto);
}

exports.responsavel = async function (req, res) {
    const contexto = {
        titulo_pagina: 'Pagina do Responsável',
    };
    
    // Configurações de cache:
    // - Página NÃO pode ser armazenada em cache em HIPÓTESE ALGUMA
    // - Nem no navegador, nem em servidores intermediários, nem em CDN
    // - Sempre buscar uma versão nova do servidor
    // - Para informações sensíveis (dados pessoais, transações, etc.)
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    // Express gera Etag automaticamente
    return res.render('responsavel', contexto);
}