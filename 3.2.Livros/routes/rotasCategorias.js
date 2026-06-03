var express = require('express');
var router = express.Router();
var controllerCategoria = require('../controller/controllerCategoria.js');

router.get('/', controllerCategoria.listar);
router.get('/:id', controllerCategoria.obter);
router.post('/', controllerCategoria.criar);
router.put('/:id', controllerCategoria.atualizar);
router.delete('/:id', controllerCategoria.deletar);

module.exports = router;