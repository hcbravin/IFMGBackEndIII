var express = require('express');
var router = express.Router();
var controllerLivros = require('../controller/controllerLivros.js')

// Rota para método GET da criação de demanda
router.get('/cadastrar', controllerLivros.cria_get);
// Rota para método POST da criação de demanda
router.post('/cadastrar', controllerLivros.cria_post);
// Rota para consulta de demanda
router.get('/consulta/:id', controllerLivros.consulta);
// Rota para alteração de status da demanda
router.post('/status/:id/:novo_status', controllerLivros.altera_status);

module.exports = router;