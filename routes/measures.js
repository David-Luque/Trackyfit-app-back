const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Measure = require('../models/aesthetic_models/Measure');
const Metric = require('../models/aesthetic_models/Metric'); 

router.post('/measure', (req, res, next)=>{
  
  const { quantity, date, metric } = req.body.theMeasure;
  const quantityNumber = Number(quantity);

  Measure.create({ 
    quantity: quantityNumber, 
    date, 
    metric 
  })
  .then(response => {
    //console.log(response)
    return Metric.findByIdAndUpdate(metric, { $push: {measures: response._id} })
    .then(theResponse => {
      res.json(theResponse)
    })
    .catch(err => res.json(err))
  })
  .catch(err => res.json(err))
});



module.exports = router;