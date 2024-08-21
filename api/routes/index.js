const express = require('express');

const productsRouter = require('./products.js');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');

function routersApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);

}

module.exports = routersApi;
