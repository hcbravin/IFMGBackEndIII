// Middleware que verifica se o usuário está autenticado.
// Caso contrário, redireciona para a tela de login antes de executar o controller.
exports.ehAutenticado = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/usuarios/login');
}

//Middleware que verifica se o usuário é admin. Caso contrário, retorna erro 403 (Proibido).
exports.ehAdmin = function (req, res, next) {
    if (req.user && req.user.perfil === 'admin') {
        return next();
    }
    // Se não for admin, envia erro 403 (Proibido)
    res.status(403).render('error', {
        message: 'Acesso negado: apenas Administradores.'
    });
}

//Middleware que verifica se o usuário é bibliotecario. Caso contrário, retorna erro 403 (Proibido).
exports.ehBibliotecario = function (req, res, next) {
    if (req.user && req.user.perfil === 'bibliotecario') {
        return next();
    }
    // Se não for admin, envia erro 403 (Proibido)
    res.status(403).render('error', {
        message: 'Acesso negado: apenas Bibliotecários.'
    });
}