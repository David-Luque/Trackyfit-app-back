const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/performance_models/Workout');
const workoutController = require('../controllers/workoutController');

router.post('/', 
  auth, 
  [
    check('name', 'Must provide a valid name').not().isEmpty()
  ], 
  workoutController.createWorkout
);

router.get('/', (req, res, next)=>{

  Workout.find({ owner: req.user._id })
  .then(response => res.json(response))
  .catch(err => console.log(err))
});



module.exports = router;