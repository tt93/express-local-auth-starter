module.exports = function requireAuth(redirectUrl) {
    return (req, res, next) => {
        if (!req.user) {
            // TODO: make more generic for APIs too
            res.redirect(403, redirectUrl || '/auth/log-in');
        } else {
            next();
        }
    }
}