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

  router.get('/:id', validateUserId, (req, res) => {
    Udb.getProjectActions(req.params.id)
    .then(udb => {
      if (udb) {
        res.status(200).json(udb);
      } else {
        res.status(404).json({ message: "The action with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the db",
      });
    });
  });

  router.post('/', (req, res) => {
    const {name, description} = req.body;

if (!name || !description) {
  res.status(400).json({
    error: "Lets see if this works"
  })
}

    Udb.insert(req.body)
    .then(udb => {
      res.status(201).json(udb);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          error: "There was an error while saving the action to the database" ,
      });
    });
  });

  router.put("/:id", (req, res) => {
    const {name, description} = req.body;

   if (!name || !description) {
  res.status(400).json({
    error: "Lets see if this works"
  })
} 
    // console.log(req.body)
    Udb.update(Number(req.params.id), req.body)
    .then(result => {
      if (result === 1) {
        res.status(204).send()
      } else {
        res.status(500).json({ error: "error updating record" })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: "error connecting to database" });
    });
  });

  router.delete('/:id', validateUserId, (req, res) => {
    Udb.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The project has been removed" });
      } else {
        res.status(404).json({ message: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
          error: "The project could not be removed",
      });
    });
  });



  function validateUserId(req, res, next) {
  Udb.getProjectActions(req.params.id)
  .then((user) => {
    if(user) {
      req.user = user;
      next();
    }else {
      res.status(400).json({
        message: "The id does not exist",
      })
    }
  })
  .catch((error) =>{
    console.log(error);
    res
    .status(500)
    .json({
      error: "stuff cant be retrieved"
    })
  })
  }

  function validateUser(req, res, next) {
    if (Object.keys(req.body).length !== 0) {
      // if the length is not equal to zero than its a valid user
      //keys return an array of strings?
      req.body.name
        ? next()
        : res.status(400).json({ error: "provide name for the user." });
    } else {
      res.status(400).json({ error: "missing data" });
    }
  }


  


  module.exports = router;