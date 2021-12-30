const { validationResult } = require('express-validator');
const Workout = require('../models/performance_models/Workout');
const mongoose = require('mongoose');


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
  try {
    const workouts = await Workout.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(workouts)

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while obtaining workouts')
  }
};


exports.findWorkout = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ msg: "Specified 'id' is not valid" });
  };

  
};


exports.editWorkout = ()=>{};


exports.deleteWorkout = ()=>{};