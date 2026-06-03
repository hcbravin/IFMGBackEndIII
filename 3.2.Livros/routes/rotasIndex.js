var express = require('express');
var router = express.Router();
// const controllerIndex = require('../controller/controllerIndex.js');
const controllerIndex = require('../controller/controllerIndex.js');

/* GET home page. */
router.get('/', controllerIndex.index);

module.exports = router;