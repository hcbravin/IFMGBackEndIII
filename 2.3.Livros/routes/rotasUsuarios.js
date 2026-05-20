var express = require('express');
var router = express.Router();
var controllerUsuario = require('../controller/controllerUsuarios');

// Rota para método GET do cadastro de usuário
router.get('/cadastro', controllerUsuario.cria_get);
// Rota para método POST do cadastro de usuário
router.post('/cadastro', controllerUsuario.cria_post);
// Rota para método GET do login de usuário
router.get('/login', controllerUsuario.login_get);
// Rota para método POST do login de usuário
router.post('/login', controllerUsuario.login_post);
// Rota para logout de usuário
router.get('/logout', controllerUsuario.logout);

module.exports = router;