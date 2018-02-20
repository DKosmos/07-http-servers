'use strict';

const parseBody = module.exports = function(req, callback){
  req.body = '';

  req.on('data', data => {
    req.body += data.toString();
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(req.body);
      callback(null, req.body);
    } catch (err){
      callback(err);
    }
  });
};