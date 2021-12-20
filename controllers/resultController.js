const Result = require('../models/performance_models/Result');
const Exercise = require('../models/performance_models/Exercise');
const { validationResult } = require('express-validator');
const Result = require('../models/performance_models/Result');

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