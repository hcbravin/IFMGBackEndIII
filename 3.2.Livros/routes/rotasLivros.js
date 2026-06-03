var express = require('express');
var router = express.Router();
var controllerLivro = require('../controller/controllerLivro.js');

router.get('/', controllerLivro.listar);
router.get('/:id', controllerLivro.obter);
router.post('/', controllerLivro.criar);
router.put('/:id', controllerLivro.atualizar);
router.delete('/:id', controllerLivro.deletar);
router.put('/:id/emprestar', controllerLivro.emprestar);
router.put('/:id/devolver', controllerLivro.devolver);

module.exports = router;