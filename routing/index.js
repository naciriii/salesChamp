const router = require('express').Router();
const middlewares = require('../middlewares');
const routes = require('./routes');

router.use(middlewares[0]);

module.exports = router.use('/address', routes);
