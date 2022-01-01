const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
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

router.put('/:id',
  auth, 
  [
    check('name', 'Must provide a valid name value').not().isEmpty(),
    check('data', 'Must provide a valid data input').not().isEmpty()
  ],
  workoutController.editWorkout
);

router.delete('/:id', 
  auth, 
  workoutController.deleteWorkout
);



module.exports = router;