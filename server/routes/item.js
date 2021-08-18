const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const requireAuth = require('../middlewares/requireAuth')

// GET	/api/items	Gets all the items in the DB
router.get('/', (req, res) => {
  Item.find()
    .then((itemDoc) => {
      res.status(200).json(itemDoc);
    })
    .catch((err) => res.status(500).json(err));
});

// GET	/api/items/:id	Get one item in the DB
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((dbRes) => {
      res.status(200).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

// POST	/api/items	Create an item in the DB	Requires auth.
router.post('/', requireAuth, (req, res) => {
  const item = req.body;
  item.creator = req.session.currentUser

  Item.create(item)
    .then((dbRes) => {
      res.status(201).json(dbRes);
    })
    .catch((err) => res.status(500).json(err));
});

// PATCH	/api/items/:id	Update an item	Requires auth.
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id)
    const currentUser = req.session.currentUser.toString()

    if(foundItem.creator.toString() === currentUser) {
      const dbRes = await Item.findByIdAndUpdate(req.params.id, foundItem, {
        new: true,
      });
      res.status(200).json(dbRes);
    } else {
      res.status(403).json("you shall not pass")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE	/api/items/:id	Deletes an item	Requires auth.
router.delete('/:id', requireAuth, async (req, res) => {
  try {

    const foundItem = await Item.findById(req.params.id)
    const currentUser = req.session.currentUser.toString()

    if(foundItem.creator.toString() === currentUser) {
      await Item.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Successfully deleted.' });
    } else {
      res.status(403).json("you shall not pass")
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
