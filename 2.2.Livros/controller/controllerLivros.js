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
    if (!novo_livro.categoria || Number.isNaN(urg) || urg > 0) {
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