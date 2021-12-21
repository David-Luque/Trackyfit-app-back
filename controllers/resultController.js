const Result = require('../models/performance_models/Result');
const Exercise = require('../models/performance_models/Exercise');
const { validationResult } = require('express-validator');

exports.createResult = async (req, res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const { exercise } = req.body;
    const exerciseDB = await Exercise.findById(exercise);

    if(!exerciseDB) res.status(404).json({ msg: "Exercise not found" });
    if(exerciseDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const result = new Result(req.body);
    await result.save();

    await Exercise.findByIdAndUpdate(req.body.exercise, { $push: { results: result._id } })

    res.json({ result });

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while creating')
  }
};

exports.getResults = async (req, res)=>{

  try {
    const { exercise } = req.body

    const exerciseDB = await Exercise.findById(exercise);
    if(!exerciseDB) res.status(404).json({ msg: 'Exercise not found' });

    if(exerciseDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const results = await Results.find({ exercise }).sort({ createdAt: -1 });

    res.json(results);


  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while requesting exercise results');
  }
  
};

exports.editResult = async (req, res)=>{
  try {
    const { reps, time, weight, exercise } = req.body;

    const exerciseDB = await Exercise.findById(exercise);

    if(!exerciseDB) res.status(404).json({ msg: 'Exercis not found' });
    if(exerciseDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const newResult = {};
    if(reps) newResult.reps = reps;
    if(time) newResult.time = time;
    if(weight) newResult.weight = weight;

    const result = Result.findByIdAndUpdate(req.params.id, newResult, { new: true });
    res.json(result);

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while updating result')
  }
};

exports.deleteResult = async (req, res)=>{

  try {
    const { exercise } = req.body;

    const exerciseDB = await Exercise.findById(exercise);

    if(!exerciseDB) res.status(404).json({ msg: 'Exercise not found' });
    if(exerciseDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    Result.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Result successfully deleted' });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('There was an error while deleting result');
  };
};