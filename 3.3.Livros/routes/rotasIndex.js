var express = require('express');
var router = express.Router();
const controllerIndex = require('../controller/controllerIndex.js');

/* GET home page. */
router.get('/', 
    /* #swagger.tags = ['Index']
    #swagger.summary = 'Retorna informações gerais da API' */
controllerIndex.index
);

router.get('/servicos',
    /* #swagger.tags = ['Index']
    #swagger.summary = 'Lista os serviços disponíveis na API' */
    controllerIndex.servicos
);

module.exports = router;