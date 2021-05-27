const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Exercise = require('../models/performance_models/Exercise');
const Result = require('../models/performance_models/Result');


router.get('/all-exercises', (req, res, next)=>{
  Exercise.find({ owner: req.user._id })
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

router.put('/edit-exercise/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };
  console.log(req.body)
  
  Exercise.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    //console.log(response)
    res.json({ message: `Exercise with id: ${req.params.id} was successfully updated` })
  })
  .catch(err => res.json(err));
});

router.delete('/exercises/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Exercise.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({ message: `Project with id: ${req.params.id} is removed successfully` })
  })
  .catch(err => res.json(err))
});


router.get('/exercises/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Exercise.findById(req.params.id)
  .populate('results')
  .then(theExercise => {
    //console.log(theExercise)
    res.status(200).json(theExercise)
  })
  .catch(err => res.json(err))
});

module.exports = router;