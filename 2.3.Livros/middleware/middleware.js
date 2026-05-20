exports.ehAutenticado = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/usuarios/login');
}