module.exports = function checkHeader(req, res, next) {
    if(req.is('application/json')) {
        return next();
    }
    return res.status(415).send();
}