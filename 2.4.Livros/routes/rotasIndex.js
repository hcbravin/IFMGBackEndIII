var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')
const { ehAutenticado, ehAdmin, ehBibliotecario } = require('../middleware/middleware');

/* GET home page. */
router.get('/', controllerIndex.tela_principal);
router.get('/historia', controllerIndex.historia);
router.get('/faq', controllerIndex.faq);
router.get('/responsavel', ehAutenticado, ehAdmin, controllerIndex.responsavel);


module.exports = router;