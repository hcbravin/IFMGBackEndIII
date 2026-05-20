var express = require('express');
var router = express.Router();
var controllerLivros = require('../controller/controllerLivros.js')
const { ehAutenticado } = require('../middleware/middleware');

// Rota para método GET da criação de demanda
router.get('/cadastrar', ehAutenticado, controllerLivros.cria_get);
// Rota para método POST da criação de demanda
router.post('/cadastrar', ehAutenticado, controllerLivros.cria_post);
// Rota para consulta de demanda
router.get('/consulta/:id', controllerLivros.consulta);
// Rota para alteração de status da demanda
router.post('/status/:id/:novo_status', ehAutenticado, controllerLivros.altera_status);
// Rota para historico
router.get('/historico', controllerLivros.historico_livros);

module.exports = router;