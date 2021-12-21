const Exercise = require('../models/performance_models/Exercise');
const { validationResult } = require('express-validator');

exports.createExercise = async (req, res)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  try {
    const exercise = new Exercise(req.body);
    exercise.owner = req.user.id;
    await exercise.save();
    res.json({ exercise });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error while creating exercise");
  }

  Exercise.create({
    name: req.body.name,
    owner: req.user._id,
    results: []
  })
  .then(response => res.json(response))
  .catch(err => res.json(err));
};

exports.getExercises = async (req, res)=>{
  try {
    const exercises = await Exercises.find({ owner: req.user.id }).sort({ name: 1 })
    res.json({ exercises });
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error while getting exercises");
  }
};

exports.findExercise = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ msg: "Specified 'id' is not valid" });
  };

  try {
    const theExercise = await Exercise.findById(req.params.id).populate('results');
    const resultsCopy = [...theExercise.results];
    resultsCopy.sort((a, b)=>{
      return new Date(a.date) - new Date(b.date);
    });
    theExercise.results = resultsCopy;
    res.status(200).json(theExercise);
  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error while getting exercise data")
  };

  // Exercise.findById(req.params.id)
  // .populate('results')
  // .then(theExercise => {
  //   const resultsCopy = [...theExercise.results]
  //   const sortResults = resultsCopy.sort((a, b)=>{
  //     return new Date(a.date) - new Date(b.date);
  //   });
  //   theExercise.results = sortResults;
    
  //   res.status(200).json(theExercise)
  // })
  // .catch(err => res.json(err))
};

exports.editExercise = async (req, res)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  
  try {
    let exercise = await Exercises.findById(req.params.id);

    if(!exercise) res.status(404).json({ msg: 'Exercise not found' });
    if(exercise.owner.toString() !== req.user.id) res.status(401).json({ msg: "Unauthorized" });

    const { name } = req.body;
    const newExercise = {};
    if(name) newExercise.name = name;

    exercise = await Exercise.findByIdAndUpdate(req.params.id, { $set: newExercise }, { new: true })

    res.json({ exercise });

  } catch (err) {
    console.log(err);
    res.status(500).send("There wan an error while updating");
  }


};

exports.deleteExercise = async (req, res)=>{
  

  Exercise.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({ message: `Project with id: ${req.params.id} is removed successfully` })
  })
  .catch(err => res.json(err))


  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  try {
    let exercise = await Exercise.findById(req.params.id);
    
    if(!exercise) res.status(404).json({ msg: 'Exercise not found' });
    if(exercise.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    await Exercise.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Exercise was successfully deleted' });

  } catch (err) {
    console.log(err);
    res.status(500).send("There was an error while deleting");
  }
};