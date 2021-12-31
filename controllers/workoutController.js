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

  try {
    const workout = await Workout.findById(req.params.id).sort({ date: -1 }).populate('Exercise').populate('Result');
    res.status(200).json(workout);

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while finding workout')
  }
  

};


exports.editWorkout = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ msg: "Specified 'id' is not valid" });
  };

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  };

  
  
  try {
    const workout = await Workout.findById(req.params.id);

    if(!workout) res.status(404).json({ msg: 'Workout not found' });
    if(workout.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const { name, data } = req.body;
    const newWorkout = {};
    if(name) newWorkout.name = name;
    if(data) newWorkout.data = data;

    await Workout.findByIdAndUpdate(req.params.id, { $set: newWorkout }, { new: true });
    res.status(200).json(newWorkout);

  } catch(err) {
    console.log(err);
    res.status(500).send('There was an error while updating workout');
  }; 
};


exports.deleteWorkout = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ msg: "Specified 'id' is not valid" });
  };

  try {
    const workout = await Workout.findById(req.params.id);

    if(!workout) res.status(404).json({ msg: 'Workout not found' });
    if(workout.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    await Workout.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: 'Workout successfully deleted' });

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while deleting workout');
  }
};