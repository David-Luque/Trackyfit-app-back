const Results = require('../models/performance_models/Result');
const { validationResult } = require('express-validator');

exports.createResult = async (req, res)=>{
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
      res.json(theResponse)
    })
  })
  .catch(err => res.json(err))
};