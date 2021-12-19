const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Exercise = require('../models/performance_models/Exercise');
//const Result = require('../models/performance_models/Result');
const exerciseController = require('../controllers/exerciseController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/', 
  auth, 
  [
    check('name', 'Must provide a valid name').not().isEmpty()
  ], 
  exerciseController.createExercise
);

router.get('/',
  auth, 
  exerciseController.getExercises
);

router.get('/:id',
  auth,
  exerciseController.findExercise
);

router.put('/:id', 
  auth, 
  [
    check('name', 'You must provide a valid name').not().isEmpty()
  ], 
  exerciseController.editExercise
);

router.delete('/:id', 
  auth, 
  exerciseController.deleteExercise
);



module.exports = router;