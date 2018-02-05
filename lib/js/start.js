/* Bare bones static file server */
var http = require('http');
var express = require('express');
var compression = require('compression');

/* ## lost
  Router for anything we don't have an end point for.
  @param req {object} Node/Express request object
  @param res {object} Node/Express response object
 */
lost = function(req, res){
  return res.status(404).send('<p>Sorry... You must be lost &#x2639;.</p>');
};

express()
  .use(compression())
  .use(express['static']('www'))
  .get('*', lost)
  .listen(3000);
