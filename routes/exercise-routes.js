const express = require('express');
const router = express.Router();
const Exercise = require('../models/performance_models/Exercise');
const Result = require('../models/performance_models/Result');

router.get('/all-exercises', (req, res, next)=>{
  Exercise.find({ owner: req.user._id })
  // .populate('results')
  .then(response => res.json(response))
  .catch(err => res.json(err))
});


router.post('/create-exercise', (req, res, next)=>{
  Exercise.create({
    name: req.body.name,
    owner: req.user._id,
    results: []
  })
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

router.put('/edit-exercise', (req, res, next)=>{
  Exercise.findByIdAndUpdate(req.body.id, { name: req.body.name })
  .then(response => res.json(response))
  .catch(err => res.json(err));
});


module.exports = router;