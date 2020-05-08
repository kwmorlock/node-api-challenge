const express = require('express');

const Udb = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Udb.get()
    .then(udb => {
      res.status(200).json(udb);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The projects information could not be retrieved." });
    });
  });

  module.exports = router;