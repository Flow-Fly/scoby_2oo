const express = require("express");
const router = express.Router();
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");
const Item = require("../models/Item");
const uploader = require("../config/cloudinary");

router.patch("/me", requireAuth, uploader.single("profileImg"), async (req, res, next) => {
  try {
    if(req.file) {
      req.body.profileImg = req.file.path;
    }

    const dbRes = await User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true });
    
    res.status(200).json(dbRes)
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.get("/me", requireAuth, async (req,res) => {
  try {
    const dbRes = await User.findById(req.session.currentUser);
    res.status(200).json(dbRes)
  }
  catch (error) {
    res.status(500).json(error);
  }
})

router.get("/me/items", requireAuth, async (req,res) => {
  try {
    // console.log("it works", req.session.currentUser)
    // const objectId = mongoose.Types.ObjectId(req.session.currentUser)
    // // const objectId = ObjectId(req.session.currentUser)
    // console.log("answer", typeof objectId)
    // console.log(typeof req.session.currentUser, req.session.currentUser)
    const dbRes = await Item.find({creator: req.session.currentUser});
    console.log("dbres", dbRes)
    res.status(200).json(dbRes)
  }
  catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
