const express = require('express');

const router = express.Router();

//Routes for assignments

const Assignment = require('../models/assignment');


//Get Assignment
router.get('/totals', (req, res) => {
  Assignment.getAll()
    .then(assignments => {
      return Assignment.total(assignments)
    })
    .then(total => {
      res.send(total)
    })
    .catch(err => {
      res.status(400).send(`Error found at... ${err}`)
    });
});

router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignment => {
      res.send(assignment)
    })
    .catch(err => {
      res.status(400).send(`Error found at... ${err}`)
    });
});

router.get('/:id', (req, res) => {
    Assignment.getOne(req.params.id)
    .then(assignment => {
      res.send(assignment)
    })
    .catch(err => {
      res.status(400).send(`Error found at... ${err}`)
    });
});
router.post('/', (req, res) => {
  Assignment.create(req.body)
    .then(() => {
      res.send('Success posting')
    })
    .catch(err => {
      res.status(400).send(`Error posting... ${err}`)
    });
});

router.delete('/:id', (req, res) => {
  Assignment.delete(req.params.id)
    .then(() => {
      res.send('Success deleting')
    })
    .catch(err => {
      res.status(400).send(`Error deleting... ${err}`)
    });
});

router.put('/:id', (req, res) => {
  Assignment.update(req.params.id, req.body)
    .then(() => {
      return Assignment.getOne(req.params.id) //Returns a promise
    })
    .then(assignment => {
      res.send(assignment);
    })
    .catch(err => {
      res.status(400).send(`Error updating... ${err}`)
    });

});


module.exports = router