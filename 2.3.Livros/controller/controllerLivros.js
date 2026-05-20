const { Livro, Categoria } = require('../model/modelos');

exports.cria_get = async function (req, res) {
    
    const AllCategorias = await Categoria.findAll(); // busca todas as categorias
    const contexto = {
        titulo_pagina: "Cadastrar novo Livro",
        categorias: AllCategorias
    }

    console.log(contexto.categorias)
    res.render('cadastrar_livro', contexto);
}

exports.cria_post = async function (req, res) {
    const novo_livro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        categoria: req.body.categoria,
    };

    console.log("Novo Livro: ",novo_livro)


    // validação simples no controller
    const erros = [];
    if (!novo_livro.titulo || novo_livro.titulo.trim() === '') {
        erros.push({ msg: 'Título é obrigatório' });
    }
    if (!novo_livro.autor || novo_livro.autor.trim() === '') {
        erros.push({ msg: 'Autor é obrigatório' });
    }
    const urg = Number(novo_livro.categoria);
    if (!novo_livro.categoria || Number.isNaN(urg) || urg <= 0) {
        erros.push({ msg: 'Categoria não encontrada' });
    }

    if (erros.length > 0) {
        const contexto = {
            titulo_pagina: 'Cadastrar novo livro',
            erros: erros,
            old: { titulo: novo_livro.titulo, autor: novo_livro.autor, categoria: novo_livro.categoria }
        };
        return res.status(400).render('cadastrar_livro', contexto);
    }

    try {
        await Livro.create({ titulo: novo_livro.titulo, autor: novo_livro.autor, categoria_id: novo_livro.categoria });
        return res.redirect('/');

    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return res.status(500).send('Erro ao criar livro');
    }
};

exports.consulta = async function (req, res) {
    const id_livro = parseInt(req.params.id);

    // validação do parâmetro id (deve ser inteiro positivo)
    if (!id_livro || Number.isNaN(id_livro) || !Number.isInteger(id_livro) || id_livro <= 0) {
        return res.status(400).send('ID inválido');
    }

    try {
        
        // const livro = await Livro.findByPk(id_livro); // Procura o livro
        const livro = await Livro.findByPk(id_livro, {
            include: [{
                model: Categoria,
                as: 'categoria',  // mesmo nome que eu defini na associação
                attributes: ['id', 'nome']  // atenção: selecionar apenas os campos que precisa
            }]
        });
        
        if (!livro) {
            return res.status(404).send('livro não encontrada');
        }

        // const categoria = await Categoria.findByPk(livro.categoria_id); // Procura a categoria do livro

        // formata a data de criação de cada livro para o formato brasileiro
        livro.criada_em_fmt = new Date(livro.criada_em).toLocaleDateString('pt-BR');
        livro.atualizada_em_fmt = new Date(livro.atualizada_em).toLocaleDateString('pt-BR');
        livro.status_btn = livro.status == 'disponivel' ? true : false;

        const contexto = {
            titulo_pagina: 'Detalhes do livro',
            livro: livro,
        };

        console.log(livro);
        return res.render('consulta_livro', contexto);

    } catch (error) {
        console.error('Erro ao recuperar livro:', error);
        return res.status(500).send('Erro ao recuperar livro');
    }
};

exports.altera_status = async function (req, res) {
    const id_livro = parseInt(req.params.id);
    const novo_status = req.params.novo_status;

    // validação dos parâmetros
    const status_permitidos = ['disponivel', 'emprestado'];
    if (!id_livro || Number.isNaN(id_livro) || !Number.isInteger(id_livro) || id_livro <= 0) {
        return res.status(400).send('ID inválido');
    }
    if (!status_permitidos.includes(novo_status)) {
        return res.status(400).send('Status inválido');
    }

    try {
        await Livro.update(
            { status: novo_status }, // novos valores dos atributos
            { where: { id: id_livro } } // condição para encontrar a demanda a ser atualizada
        );
        return res.redirect('/');
    } catch (error) {
        console.error('Erro ao alterar status da demanda:', error);
        return res.status(500).send('Erro ao alterar status da demanda');
    }
};

exports.historico_livros = async function (req, res) {
    try {
        const anoAtual = new Date().getFullYear();

        // Buscar todos os livros com suas categorias
        const livros = await Livro.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }],
            order: [['criada_em', 'ASC']]
        });

        // Filtrar apenas livros de anos anteriores ao atual
        const livrosAnosAnteriores = livros.filter(livro => {
            const anoCriacao = new Date(livro.criada_em).getFullYear();
            return anoCriacao < anoAtual;
        });

        // Se não houver livros em anos anteriores
        if (livrosAnosAnteriores.length === 0) {
            const contexto = {
                titulo_pagina: 'Histórico de Cadastros',
                temHistorico: false,
                anos: []
            };
            
            // Configurações de cache conforme solicitado
            res.set('Cache-Control', 'public, max-age=10540800, s-maxage=15778476'); // 4 meses = 10540800s, 6 meses = 15778476s
            
            return res.render('historico', contexto);
        }

        // Agrupar livros por ano
        const livrosPorAno = {};
        
        livrosAnosAnteriores.forEach(livro => {
            const anoCriacao = new Date(livro.criada_em).getFullYear();
            const categoriaNome = livro.categoria?.nome || 'Sem Categoria';
            
            if (!livrosPorAno[anoCriacao]) {
                livrosPorAno[anoCriacao] = {
                    ano: anoCriacao,
                    total: 0,
                    categorias: {},
                    livros: []
                };
            }
            
            livrosPorAno[anoCriacao].total++;
            livrosPorAno[anoCriacao].categorias[categoriaNome] = 
                (livrosPorAno[anoCriacao].categorias[categoriaNome] || 0) + 1;
            livrosPorAno[anoCriacao].livros.push(livro);
        });

        // Converter o objeto para array e ordenar por ano (decrescente)
        const anosData = Object.values(livrosPorAno).sort((a, b) => b.ano - a.ano);

        // Formatar datas dos livros para cada ano
        anosData.forEach(ano => {
            ano.livros.forEach(livro => {
                livro.criada_em_fmt = new Date(livro.criada_em).toLocaleDateString('pt-BR');
            });
        });

        const contexto = {
            titulo_pagina: 'Histórico de Cadastros de Livros',
            temHistorico: true,
            anos: anosData,
            anoAtual: anoAtual
        };

        // Configurações de cache:
        // - public: pode ser armazenada em qualquer local (CDN, proxy, navegador)
        // - max-age=10540800: 4 meses de cache no navegador (4 * 30 * 24 * 60 * 60)
        // - s-maxage=15778476: 6 meses de cache em servidores intermediários/CDN
        // - must-revalidate: revalidar com o servidor mesmo com cache válido
        // - no-cache: sempre revalidar (mas pode servir cache se não modificado)
        res.set('Cache-Control', 'public, max-age=10540800, s-maxage=15778476, must-revalidate, no-cache');
        
        // Express gera Etag automaticamente
        return res.render('historico', contexto);

    } catch (error) {
        console.error('Erro ao gerar relatório histórico:', error);
        return res.status(500).send('Erro ao gerar relatório histórico');
    }
};