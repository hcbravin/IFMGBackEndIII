var express = require('express');
var router = express.Router();
var controllerLivro = require('../controller/controllerLivro.js');

// ==================== ROTAS LIVROS ====================

// GET /livros - Listar livros
router.get('/',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros'
     #swagger.method = 'get'
     #swagger.summary = 'Lista todos os livros'
     #swagger.description = 'Retorna uma lista de livros com opção de filtrar por categoria e status'
     #swagger.parameters['categoria_id'] = {
       in: 'query',
       type: 'integer',
       required: false,
       description: 'ID da categoria para filtrar os livros'
     }
     #swagger.parameters['status'] = {
       in: 'query',
       type: 'string',
       required: false,
       enum: ['disponivel', 'emprestado'],
       description: 'Status do livro para filtrar'
     }
     #swagger.responses[200] = {
       description: 'Lista de livros retornada com sucesso',
       schema: {
         type: 'array',
         items: { $ref: '#/definitions/LivroCompleto' }
       }
     }
     #swagger.responses[500] = {
       description: 'Erro interno ao listar livros'
     }
  */
  controllerLivro.listar
);

// POST /livros - Criar livro
router.post('/',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros'
     #swagger.method = 'post'
     #swagger.summary = 'Cria um novo livro'
     #swagger.description = 'Adiciona um novo livro ao catálogo'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados do novo livro',
       schema: { $ref: '#/definitions/NovoLivro' }
     }
     #swagger.responses[201] = {
       description: 'Livro criado com sucesso',
       schema: { $ref: '#/definitions/LivroCompleto' }
     }
     #swagger.responses[400] = {
       description: 'Dados inválidos ou categoria não encontrada'
     }
  */
  controllerLivro.criar
);

// GET /livros/{id} - Buscar livro por ID
router.get('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros/{id}'
     #swagger.method = 'get'
     #swagger.summary = 'Busca um livro pelo ID'
     #swagger.description = 'Retorna os detalhes de um livro específico'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do livro a ser buscado'
     }
     #swagger.responses[200] = {
       description: 'Livro encontrado com sucesso',
       schema: { $ref: '#/definitions/LivroCompleto' }
     }
     #swagger.responses[400] = {
       description: 'ID inválido'
     }
     #swagger.responses[404] = {
       description: 'Livro não encontrado'
     }
  */
  controllerLivro.obter
);

// PUT /livros/{id} - Atualizar livro
router.put('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros/{id}'
     #swagger.method = 'put'
     #swagger.summary = 'Atualiza um livro existente'
     #swagger.description = 'Atualiza parcialmente os dados de um livro (apenas campos enviados)'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do livro a ser atualizado'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados para atualização (todos opcionais)',
       schema: { $ref: '#/definitions/AtualizarLivro' }
     }
     #swagger.responses[200] = {
       description: 'Livro atualizado com sucesso',
       schema: { $ref: '#/definitions/LivroCompleto' }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou dados inválidos'
     }
     #swagger.responses[404] = {
       description: 'Livro não encontrado'
     }
  */
  controllerLivro.atualizar
);

// DELETE /livros/{id} - Deletar livro
router.delete('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros/{id}'
     #swagger.method = 'delete'
     #swagger.summary = 'Remove um livro'
     #swagger.description = 'Remove permanentemente um livro do catálogo'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do livro a ser removido'
     }
     #swagger.responses[204] = {
       description: 'Livro removido com sucesso (sem conteúdo)'
     }
     #swagger.responses[400] = {
       description: 'ID inválido'
     }
     #swagger.responses[404] = {
       description: 'Livro não encontrado'
     }
  */
  controllerLivro.deletar
);

// PUT /livros/{id}/emprestar - Emprestar livro
router.put('/:id/emprestar',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros/{id}/emprestar'
     #swagger.method = 'put'
     #swagger.summary = 'Empresta um livro'
     #swagger.description = 'Altera o status do livro para "emprestado"'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do livro a ser emprestado'
     }
     #swagger.responses[200] = {
       description: 'Livro emprestado com sucesso',
       schema: {
         type: 'object',
         properties: {
           message: { type: 'string', example: 'Livro emprestado com sucesso' },
           livro: { $ref: '#/definitions/LivroCompleto' }
         }
       }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou livro já está emprestado'
     }
     #swagger.responses[404] = {
       description: 'Livro não encontrado'
     }
  */
  controllerLivro.emprestar
);

// PUT /livros/{id}/devolver - Devolver livro
router.put('/:id/devolver',
  /* #swagger.auto = false
     #swagger.tags = ['Livros']
     #swagger.path = '/livros/{id}/devolver'
     #swagger.method = 'put'
     #swagger.summary = 'Devolve um livro'
     #swagger.description = 'Altera o status do livro para "disponivel"'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID do livro a ser devolvido'
     }
     #swagger.responses[200] = {
       description: 'Livro devolvido com sucesso',
       schema: {
         type: 'object',
         properties: {
           message: { type: 'string', example: 'Livro devolvido com sucesso' },
           livro: { $ref: '#/definitions/LivroCompleto' }
         }
       }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou livro já está disponível'
     }
     #swagger.responses[404] = {
       description: 'Livro não encontrado'
     }
  */
  controllerLivro.devolver
);

module.exports = router;