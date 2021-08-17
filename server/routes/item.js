const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const { route } = require('./auth');

// GET	/api/items	Gets all the items in the DB
router.get('/', (req, res, next) => {
  Item.find()
    .then((itemDoc) => {
      res.status(200).json(itemDoc);
    })
    .catch((err) => next(err));
});

// GET	/api/items/:id	Get one item in the DB
router.get('/:id', (req, res, next) => {
  Item.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => next(err));
});

// POST	/api/items	Create an item in the DB	Requires auth.

// PATCH	/api/items/:id	Update an item	Requires auth.

// DELETE	/api/items/:id	Deletes an item	Requires auth.

module.exports = router;
