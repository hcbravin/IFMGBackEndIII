const { Categoria, Livro } = require('../model/modelos.js');

// Rota principal - informações sobre o serviço
exports.index = async function (req, res) {
    const resposta = {
        nome: "API de Gerenciamento de Biblioteca Comunitária",
        descricao: "Serviço web para gerenciamento do acervo da biblioteca",
        status: "online",
        timestamp: new Date().toLocaleString(),
        versao: '1.0',
        endpoints: {
            documentacao: "GET /",
            servicos: "GET /servicos",
            categorias: "GET /api/categorias",
            categoria_especifica: "GET /api/categorias/:id",
            livros: "GET /api/livros",
            livro_especifico: "GET /api/livros/:id",
            criar_livro: "POST /api/livros",
            atualizar_livro: "PUT /api/livros/:id",
            deletar_livro: "DELETE /api/livros/:id",
            emprestar_livro: "PUT /api/livros/:id/emprestar",
            devolver_livro: "PUT /api/livros/:id/devolver",
            criar_categoria: "POST /api/categorias",
            atualizar_categoria: "PUT /api/categorias/:id",
            deletar_categoria: "DELETE /api/categorias/:id"
        },
        desenvolvedor: 'Henrique Casagrande Bravin'
    };
    return res.json(resposta);
};

// Lista de serviços implementados
exports.servicos = async function (req, res) {
    const servicos = [
        { funcionalidade: "Listagem de categorias", metodo: "GET", rota: "/api/categorias" },
        { funcionalidade: "Detalhes de categoria", metodo: "GET", rota: "/api/categorias/:id" },
        { funcionalidade: "Criação de categoria", metodo: "POST", rota: "/api/categorias" },
        { funcionalidade: "Atualização de categoria", metodo: "PUT", rota: "/api/categorias/:id" },
        { funcionalidade: "Exclusão de categoria", metodo: "DELETE", rota: "/api/categorias/:id" },
        { funcionalidade: "Listagem de livros (com filtros)", metodo: "GET", rota: "/api/livros?categoria_id=1&status=disponivel" },
        { funcionalidade: "Detalhes de livro", metodo: "GET", rota: "/api/livros/:id" },
        { funcionalidade: "Criação de livro", metodo: "POST", rota: "/api/livros" },
        { funcionalidade: "Atualização de livro (parcial)", metodo: "PUT", rota: "/api/livros/:id" },
        { funcionalidade: "Exclusão de livro", metodo: "DELETE", rota: "/api/livros/:id" },
        { funcionalidade: "Empréstimo de livro", metodo: "PUT", rota: "/api/livros/:id/emprestar" },
        { funcionalidade: "Devolução de livro", metodo: "PUT", rota: "/api/livros/:id/devolver" }
    ];
    return res.json(servicos);
};