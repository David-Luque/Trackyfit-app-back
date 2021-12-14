const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Metric = require('../models/aesthetic_models/Metric');
const Measure = require('../models/aesthetic_models/Measure');


router.post('/metrics', (req, res, next)=>{
  Metric.create({
    name: req.body.name,
    unit: req.body.unit,
    owner: req.user._id,
    measures: []
  })
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

router.get('/metrics', (req, res, next)=>{
  Metric.find({ owner: req.user._id })
  .then(response => res.json(response))
  .catch(err => res.json(err))
});

router.get('/metrics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Metric.findById(req.params.id)
  .populate('measures')
  .then(theMetric => {
    const measuresCopy = [...theMetric.measures]
    const sortMeasures = measuresCopy.sort((a, b)=>{
      return new Date(a.date) - new Date(b.date);
    });
    theMetric.measures = sortMeasures;
    
    res.status(200).json(theMetric)
  })
  .catch(err => res.json(err))
});

router.put('/metrics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Metric.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: `Metric with id ${req.params.id} was successfully updated` })
  })
  .catch(err => res.json(err))
});

router.delete('/metrics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Metric.findByIdAndRemove(req.params.id)
  .then(()=>{
    res.json({ message: `Project with id: ${req.params.id} is removed successfully` })
  })
  .catch(err => res.json(err))
});



module.exports = router;