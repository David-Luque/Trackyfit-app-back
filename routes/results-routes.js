const express = require('express');
const router = express.Router();

const Results = require('../models/performance_models/Result');
const Exercise = require('../models/performance_models/Exercise');

router.post('/create-results', (req, res, next)=>{

  Results.create(req.body)
  .then(response => res.json(response))
  .catch(err => res.json(err))
});