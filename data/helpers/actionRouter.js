const express = require('express');

const Db = require('./actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Db.get()
    .then(udb => {
      res.status(200).json(udb);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
  });
