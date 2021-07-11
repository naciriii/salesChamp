const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();
require('./config');
const routes = require('./routing');

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log('App Running on PORT: ', PORT);
});
module.exports = app
