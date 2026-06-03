const { Categoria, Livro } = require('../model/modelos.js');

// Listar todas as categorias
exports.listar = async function (req, res) {
    try {
        const categorias = await Categoria.findAll();
        // página pode ser armazenada em cache por 30 dias
        res.set('Cache-Control', 'private, max-age=2592000');
        return res.json(categorias);
    } catch (error) {
        console.error('Erro ao listar categorias:', error);
        return res.status(500).json({ error: 'Erro ao listar categorias' });
    }
};

// Obter uma categoria por ID
exports.obter = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        // página pode ser armazenada em cache por 6 Meses
        res.set('Cache-Control', 'public, s-maxage=15552000, max-age=15552000');
        return res.json(categoria);
    } catch (error) {
        console.error('Erro ao recuperar categoria:', error);
        return res.status(500).json({ error: 'Erro ao recuperar categoria' });
    }
};

// Criar nova categoria
exports.criar = async function (req, res) {
    const { nome } = req.body;
    const erros = [];
    
    if (!nome || nome.trim() === '') {
        erros.push({ msg: 'Nome da categoria é obrigatório' });
    }
    
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    
    try {
        const nova_categoria = await Categoria.create({ nome: nome.trim() });
        return res.status(201).json(nova_categoria);
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        return res.status(500).json({ error: 'Erro ao criar categoria' });
    }
};

// Atualizar categoria (com atualização parcial)
exports.atualizar = async function (req, res) {
    const id = Number(req.params.id);
    const { nome } = req.body;
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    const erros = [];
    if (nome !== undefined && nome.trim() === '') {
        erros.push({ msg: 'Nome da categoria não pode ser vazio' });
    }
    
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        const dadosAtualizar = {};
        if (nome !== undefined) dadosAtualizar.nome = nome.trim();
        
        await categoria.update(dadosAtualizar);
        return res.json(categoria);
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
};

// Deletar categoria
exports.deletar = async function (req, res) {
    const id = Number(req.params.id);
    
    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        
        await categoria.destroy();
        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        return res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
};