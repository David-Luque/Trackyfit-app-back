const express = require('express');
const router = express.Router();

const Result = require('../models/performance_models/Result');
const Exercise = require('../models/performance_models/Exercise');

router.post('/create-results', (req, res, next)=>{

  const { reps, time, weight, date, exercise } = req.body;

  Result.create({
    reps,
    time, 
    weight,
    date,
    exercise
  })
  .then(response => {
    return Exercise.findByIdAndUpdate(req.body.exercise, {
      $push: {results: response._id}
    })
    .then(theResponse => {
      console.log('Push result id to exercise!!')
      console.log(theResponse)
      res.json(theResponse)
    })
  })
  .catch(err => res.json(err))
});

module.exports = router;