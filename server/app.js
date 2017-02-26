'use strict'

const express = require('express');
const path = require('path');
const morgan = require('morgan');

module.exports = function expressApp() {
  const app = express();

  // logging
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('common'));
  }

  // setup the views engine
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'views'));

  // routes
  app.get('/', (req, res) => res.render('index.html'));

  return app;
}
