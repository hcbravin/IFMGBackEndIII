const { Livro, Categoria } = require('../model/modelos.js');
const { Op } = require('sequelize');

// Listar livros com filtros opcionais
exports.listar = async function (req, res) {
    try {
        const { categoria_id, status } = req.query;
        const where = {};
        
        // Filtro por categoria
        if (categoria_id && !isNaN(categoria_id) && categoria_id > 0) {
            where.categoria_id = Number(categoria_id);
        }
        
        // Filtro por status
        const status_permitidos = ['disponivel', 'emprestado'];
        if (status && status_permitidos.includes(status)) {
            where.status = status;
        }
        
        const livros = await Livro.findAll({
            where,
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }],
            order: [['criada_em', 'DESC']]
        });
        
        return res.json(livros);
    } catch (error) {
        console.error('Erro ao listar livros:', error);
        return res.status(500).json({ error: 'Erro ao listar livros' });
    }
};

// Obter um livro por ID
exports.obter = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const livro = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        return res.json(livro);
    } catch (error) {
        console.error('Erro ao recuperar livro:', error);
        return res.status(500).json({ error: 'Erro ao recuperar livro' });
    }
};

// Criar novo livro
exports.criar = async function (req, res) {
    const { titulo, autor, categoria_id, status } = req.body;
    const erros = [];
    
    // Validações
    if (!titulo || titulo.trim() === '') {
        erros.push({ msg: 'Título é obrigatório' });
    }
    
    if (!autor || autor.trim() === '') {
        erros.push({ msg: 'Autor é obrigatório' });
    }
    
    const cat_id = Number(categoria_id);
    if (!categoria_id || Number.isNaN(cat_id) || cat_id <= 0) {
        erros.push({ msg: 'Categoria é obrigatória e deve ser um ID válido' });
    } else {
        // Verificar se categoria existe
        const categoriaExists = await Categoria.findByPk(cat_id);
        if (!categoriaExists) {
            erros.push({ msg: 'Categoria não encontrada' });
        }
    }
    
    // Validar status se foi enviado
    const status_permitidos = ['disponivel', 'emprestado'];
    if (status !== undefined && !status_permitidos.includes(status)) {
        erros.push({ msg: 'Status deve ser "disponivel" ou "emprestado"' });
    }
    
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    
    try {
        const novo_livro = await Livro.create({
            titulo: titulo.trim(),
            autor: autor.trim(),
            categoria_id: cat_id,
            status: status || 'disponivel'
        });
        
        // Buscar o livro com a categoria para retornar
        const livroCompleto = await Livro.findByPk(novo_livro.id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        return res.status(201).json(livroCompleto);
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        return res.status(500).json({ error: 'Erro ao criar livro' });
    }
};

// Atualizar livro (parcial)
exports.atualizar = async function (req, res) {
    const id = Number(req.params.id);
    const { titulo, autor, categoria_id, status } = req.body;
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    const erros = [];
    const dadosAtualizar = {};
    
    // Validações condicionais (só valida se o campo foi enviado)
    if (titulo !== undefined) {
        if (titulo.trim() === '') {
            erros.push({ msg: 'Título não pode ser vazio' });
        } else {
            dadosAtualizar.titulo = titulo.trim();
        }
    }
    
    if (autor !== undefined) {
        if (autor.trim() === '') {
            erros.push({ msg: 'Autor não pode ser vazio' });
        } else {
            dadosAtualizar.autor = autor.trim();
        }
    }
    
    if (categoria_id !== undefined) {
        const cat_id = Number(categoria_id);
        if (Number.isNaN(cat_id) || cat_id <= 0) {
            erros.push({ msg: 'ID de categoria inválido' });
        } else {
            const categoriaExists = await Categoria.findByPk(cat_id);
            if (!categoriaExists) {
                erros.push({ msg: 'Categoria não encontrada' });
            } else {
                dadosAtualizar.categoria_id = cat_id;
            }
        }
    }
    
    if (status !== undefined) {
        const status_permitidos = ['disponivel', 'emprestado'];
        if (!status_permitidos.includes(status)) {
            erros.push({ msg: 'Status deve ser "disponivel" ou "emprestado"' });
        } else {
            dadosAtualizar.status = status;
        }
    }
    
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    
    if (Object.keys(dadosAtualizar).length === 0) {
        return res.status(400).json({ error: 'Nenhum campo válido para atualização' });
    }
    
    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        await livro.update(dadosAtualizar);
        
        const livroAtualizado = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        return res.json(livroAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        return res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
};

// Deletar livro
exports.deletar = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        await livro.destroy();
        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        return res.status(500).json({ error: 'Erro ao deletar livro' });
    }
};

// Emprestar livro
exports.emprestar = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const livro = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        if (livro.status === 'emprestado') {
            return res.status(400).json({ 
                error: 'Livro já está emprestado',
                livro: livro
            });
        }
        
        await livro.update({ status: 'emprestado' });
        
        const livroAtualizado = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        return res.json({ 
            message: 'Livro emprestado com sucesso',
            livro: livroAtualizado
        });
    } catch (error) {
        console.error('Erro ao emprestar livro:', error);
        return res.status(500).json({ error: 'Erro ao emprestar livro' });
    }
};

// Devolver livro
exports.devolver = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const livro = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        if (!livro) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        
        if (livro.status === 'disponivel') {
            return res.status(400).json({ 
                error: 'Livro já está disponível (não está emprestado)',
                livro: livro
            });
        }
        
        await livro.update({ status: 'disponivel' });
        
        const livroAtualizado = await Livro.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['id', 'nome']
            }]
        });
        
        return res.json({ 
            message: 'Livro devolvido com sucesso',
            livro: livroAtualizado
        });
    } catch (error) {
        console.error('Erro ao devolver livro:', error);
        return res.status(500).json({ error: 'Erro ao devolver livro' });
    }
};