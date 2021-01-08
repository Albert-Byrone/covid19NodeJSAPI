const express = require('express');
const router = express.Router()

const Case = require('../models/case')

//Get All
router.get("/", async (req, res) => {
    try {
      const cases = await Case.find().limit(20);
      res.json(cases);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //Get One
  router.get("/:_id", getCase, (req, res) => {
    res.json(res._case);
  });
  
  //Create One
  router.post("/", async (req, res) => {
    console.log(req.body);
    const _case = new Case({
        date: req.body.date,
      country: req.body.country,
      state: req.body.state,
      cases: req.body.cases,
      deaths: req.body.deaths
    });
    try {
      const newCase = await _case.save();
      res.status(201).json({ newCase });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Patch One
  router.patch("/:id", getCase, async (req, res) => {
    if (req.body.date != null) {
      res._user.date = req.body.date;
    }
    if (req.body.country != null) {
      res._user.country = req.body.country;
    }
    if (req.body.state != null) {
        res._user.state = req.body.state;
    }

    if (req.body.cases != null) {
    res._user.cases = req.body.cases;
    }

    if (req.body.deaths != null) {
    res._user.deaths = req.body.deaths;
    }
    try {
      const updatedUser = await res._case.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Put One
  router.put("/:_id", getCase, async (req, res) => {
    try {
      const updatedUser = await res._case.set(req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Delete One
  router.delete("/:_id", getCase, async (req, res) => {
    try {
      await res._case.deleteOne();
      res.json({ message: "Case has been deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //getCase middleware
  async function getCase(req, res, next) {
    let _case;
    try {
      _case = await  Case.findById(req.params._id);
      if (_case == null) {
        return res.status(404).json({ message: "Cannot find _case" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res._case = _case;
    next();
  }
  
  module.exports = router;