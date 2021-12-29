const { validationResult } = require('express-validator');
const Workout = require('../models/performance_models/Workout');


exports.createWorkout = async (req, res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmppty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  try {
    const workout = new Workout(req.body);
    workout.owner = req.user.id;
    await workout.save();
    res.json({ workout });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'There was an error while createing workout' });
  }
};


exports.getWorkouts = async (req, res)=>{
  
};


exports.findWorkout = ()=>{};


exports.editWorkout = ()=>{};


exports.deleteWorkout = ()=>{};