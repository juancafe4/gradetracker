const express = require('express');

const router = express.Router();

//Routes for assignments

const Assignment = require('../models/assignment');


//Get Assignment

router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignment => {
      res.send(assignments)
    })
    .catch(err => {
      res.status(400).res.send(`Error found at... ${err}`)
    });
});

module.exports = router