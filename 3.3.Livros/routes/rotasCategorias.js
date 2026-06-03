var express = require('express');
var router = express.Router();
var controllerCategoria = require('../controller/controllerCategoria.js');

// ==================== ROTAS CATEGORIAS ====================

// GET /categorias - Listar categorias
router.get('/',
  /* #swagger.auto = false
     #swagger.tags = ['Categorias']
     #swagger.path = '/categorias'
     #swagger.method = 'get'
     #swagger.summary = 'Lista todas as categorias'
     #swagger.description = 'Retorna uma lista de todas as categorias cadastradas'
     #swagger.responses[200] = {
       description: 'Lista de categorias retornada com sucesso',
       schema: {
         type: 'array',
         items: { $ref: '#/definitions/Categoria' }
       }
     }
     #swagger.responses[500] = {
       description: 'Erro interno ao listar categorias'
     }
  */
  controllerCategoria.listar
);

// POST /categorias - Criar categoria
router.post('/',
  /* #swagger.auto = false
     #swagger.tags = ['Categorias']
     #swagger.path = '/categorias'
     #swagger.method = 'post'
     #swagger.summary = 'Cria uma nova categoria'
     #swagger.description = 'Adiciona uma nova categoria ao sistema'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados da nova categoria',
       schema: { $ref: '#/definitions/NovaCategoria' }
     }
     #swagger.responses[201] = {
       description: 'Categoria criada com sucesso',
       schema: { $ref: '#/definitions/Categoria' }
     }
     #swagger.responses[400] = {
       description: 'Nome da categoria é obrigatório'
     }
  */
  controllerCategoria.criar
);

// GET /categorias/{id} - Buscar categoria por ID
router.get('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Categorias']
     #swagger.path = '/categorias/{id}'
     #swagger.method = 'get'
     #swagger.summary = 'Busca uma categoria pelo ID'
     #swagger.description = 'Retorna os detalhes de uma categoria específica'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID da categoria a ser buscada'
     }
     #swagger.responses[200] = {
       description: 'Categoria encontrada com sucesso',
       schema: { $ref: '#/definitions/Categoria' }
     }
     #swagger.responses[400] = {
       description: 'ID inválido'
     }
     #swagger.responses[404] = {
       description: 'Categoria não encontrada'
     }
  */
  controllerCategoria.obter
);

// PUT /categorias/{id} - Atualizar categoria
router.put('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Categorias']
     #swagger.path = '/categorias/{id}'
     #swagger.method = 'put'
     #swagger.summary = 'Atualiza uma categoria existente'
     #swagger.description = 'Atualiza os dados de uma categoria'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID da categoria a ser atualizada'
     }
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       description: 'Dados para atualização',
       schema: { $ref: '#/definitions/AtualizarCategoria' }
     }
     #swagger.responses[200] = {
       description: 'Categoria atualizada com sucesso',
       schema: { $ref: '#/definitions/Categoria' }
     }
     #swagger.responses[400] = {
       description: 'ID inválido ou nome inválido'
     }
     #swagger.responses[404] = {
       description: 'Categoria não encontrada'
     }
  */
  controllerCategoria.atualizar
);

// DELETE /categorias/{id} - Deletar categoria
router.delete('/:id',
  /* #swagger.auto = false
     #swagger.tags = ['Categorias']
     #swagger.path = '/categorias/{id}'
     #swagger.method = 'delete'
     #swagger.summary = 'Remove uma categoria'
     #swagger.description = 'Remove permanentemente uma categoria do sistema'
     #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'integer',
       description: 'ID da categoria a ser removida'
     }
     #swagger.responses[204] = {
       description: 'Categoria removida com sucesso (sem conteúdo)'
     }
     #swagger.responses[400] = {
       description: 'ID inválido'
     }
     #swagger.responses[404] = {
       description: 'Categoria não encontrada'
     }
  */
  controllerCategoria.deletar
);

module.exports = router;