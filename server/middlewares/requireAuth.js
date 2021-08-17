function requireAuth(req, res, next) {
    if(req.session.currentUser) {
        next()
    } else {
        res.status(401).json("not authorized")
    }
}

module.exports = requireAuth;