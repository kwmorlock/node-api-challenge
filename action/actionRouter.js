const express = require('express');

const Db = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Db.get()
    .then(udb => {
      res.status(200).json(udb);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The actions information could not be retrieved." });
    });
  });

  module.exports = router;