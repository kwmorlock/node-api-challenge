const express = require('express');

const actionRouter = require('./helpers/actionRouter');
const projectRouter = require('./helpers/projectRouter');

const server = express();

server.use(express.json())
server.use(logger);

server.use("/api/action", actionRouter );
server.use("/api/project", projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some functioning middleware this time!</h2>`);
  });