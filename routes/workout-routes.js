const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Workout = require('../models/performance_models/Workout');

router.get('/all-workouts', (req, res, next)=>{

  Workout.find({ owner: req.user._id })
  .then(response => res.json(response))
  .catch(err => console.log(err))
});

router.post('/workouts', (req, res, next)=>{
  
  Workout.create({
    name: req.body.name,
    date: req.body.date,
    data: [],
    owner: req.user._id
  })
});

module.exports = router;