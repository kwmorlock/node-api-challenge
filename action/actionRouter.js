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

  // router.get('/:id', validateUserId, (req, res) => {
  //   Udb.getById(req.params.id)
  //   .then(udb => {
  //     if (udb) {
  //       res.status(200).json(udb);
  //     } else {
  //       res.status(404).json({ message: "The action with the specified ID does not exist." });
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Error retrieving the db",
  //     });
  //   });
  // });

  

  module.exports = router;