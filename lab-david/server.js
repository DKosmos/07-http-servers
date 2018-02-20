'use strict';

//native modules
const http = require('http');
const url = require('url');
const querystring = require('querystring');
//third party modules
const cowsay = require('cowsay');
//custom modules
const parseBody = require('./lib/parsebody.js');
//app constants
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.method === 'GET' && req.url.pathname === '/cowsay'){
    let params = req.url.query;
    if(params.text){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: params.text}));
      res.end();
    }
    if(!params.text){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request'}));
      res.end();
    }
  }

  if(req.method === 'GET' && req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello from my server!');
    res.end();
  }

  if(req.method === 'POST' || req.method === 'PUT'){
    parseBody(req, function(err){
      if(err) throw new Error('error parsing request body');
      console.log('req.body:', req.body);
      res.end();
    });
  }

  res.end();
});

server.listen(PORT, () => {
  console.log('server up on:', PORT);
});