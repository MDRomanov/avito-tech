const express = require('express');
const morgan = require('morgan');
const path = require('path');

const config = (app) => {
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.disable('x-powered-by');
  };
  
  module.exports = config;