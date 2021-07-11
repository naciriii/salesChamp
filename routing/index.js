const router = require('express').Router();
const routes = require('./routes');


module.exports = router.use("/address", routes);