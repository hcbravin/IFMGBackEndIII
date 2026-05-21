var express = require('express');
var router = express.Router();
var controllerLivros = require('../controller/controllerLivros.js')
const { ehAutenticado, ehAdmin, ehBibliotecario } = require('../middleware/middleware');

// Rota para método GET da criação de demanda
router.get('/cadastrar', ehAutenticado, ehBibliotecario, controllerLivros.cria_get);
// Rota para método POST da criação de demanda
router.post('/cadastrar', ehAutenticado, ehBibliotecario, controllerLivros.cria_post);
// Rota para consulta de demanda
router.get('/consulta/:id', controllerLivros.consulta);
// Rota para alteração de status da demanda
router.post('/status/:id/:novo_status', ehAutenticado, ehBibliotecario, controllerLivros.altera_status);
// Rota para historico
router.get('/historico', ehAutenticado, ehAdmin, controllerLivros.historico_livros);

module.exports = router;