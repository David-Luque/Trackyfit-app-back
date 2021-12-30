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

router.get('/', 
  auth, 
  workoutController.getWorkouts
);

router.get('/:id', 
  auth, 
  workoutController.findWorkout
);

router.put('/:id', auth, workoutController.editWorkout);

router.delete('/:id', auth, workoutController.deleteWorkout);



module.exports = router;