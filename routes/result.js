const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resultController = require('../controllers/resultController');
//const mongoose = require('mongoose');
const Result = require('../models/performance_models/Result');
const Exercise = require('../models/performance_models/Exercise');
const { check } = require('express-validator');


router.post('/', 
  auth, 
  [
    
  ], 
  resultController.createResult
);

module.exports = router;