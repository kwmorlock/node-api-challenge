const express = require('express');

const actionRouter = require('./action/actionRouter');
const projectRouter = require('./project/projectRouter');

const server = express();

server.use(express.json())
server.use(logger);

server.use("/action", actionRouter );
server.use("/project", projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some functioning middleware this time!</h2>`);
  });

  function logger(req, res, next) {
    console.log(req.method);
     console.log(req.url);
    console.log(Date.now());
    next();
    }

    module.exports = server;