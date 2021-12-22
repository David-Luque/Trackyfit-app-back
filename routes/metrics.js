const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const metricController = require('../controllers/metricController');
const Metric = require('../models/aesthetic_models/Metric');
const Measure = require('../models/aesthetic_models/Measure');
const { check } = require('express-validator');

router.post('/', 
  auth, 
  [
    check('name', 'Must provide a valid name').not().isEmpty(),
    check('unit', 'Must provide a valid unit').not().isEmpty()
  ], 
  metricController.createMetric
);

router.get('/', 
  auth,  
  metricController.getMetrics
);

router.get('/:id', (req, res, next)=>{
  
});

router.put('/:id', 
  auth, 
  [
    check(),
    check()
  ], 
  metricController.editMetric
);

router.delete('/:id', 
  auth, 
  metricController.deleteMetric
);



module.exports = router;