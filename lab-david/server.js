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
      console.log('GET/cowsay');
      res.end();
    }
    if(!params.text){
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request'}));
      console.log('GET/cowsay BR');
      res.end();
    }
  }

  if(req.method === 'GET' && req.url.pathname === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello from my server!');
    console.log('GET/');
    res.end();
  }

  if(req.method === 'POST' || req.method === 'PUT'){
    parseBody(req, function(err){
      if(err) console.error(err);
      console.log('req.body.text:', req.body.text);
      let text = req.body.text;
      console.log('text:', text);
      if(!text){
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request'}));
        console.log('POST/PUT BR');
        res.end();
      }
      if(text){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: req.body.text}));
        console.log('POST/PUT');
        res.end();
      }
    });
  }
});

server.listen(PORT, () => {
  console.log('server up on:', PORT);
});