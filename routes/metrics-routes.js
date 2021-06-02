const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Metric = require('../models/aesthetic_models/Metric');
const Measurement = require('../models/aesthetic_models/Measurement');


router.get('/all-metrics', (req, res, next)=>{
  Metric.find({ owner: req.user._id })
  .then(response => res.json(response))
  .catch(err => res.json(err))
});


router.post('/create-metric', (req, res, next)=>{
  Metric.create({
    name: req.body.name,
    owner: req.user._id,
    measurements: []
  })
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

router.get('/metrics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  Metric.findById(req.params.id)
  .populate('measurements')
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

// router.put('/edit-exercise/:id', (req, res, next)=>{
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)){
//     res.status(400).json({ message: "Specified 'id' is not valid" });
//   };
//   console.log(req.body)
  
//   Exercise.findByIdAndUpdate(req.params.id, req.body)
//   .then(() => {
//     //console.log(response)
//     res.json({ message: `Exercise with id: ${req.params.id} was successfully updated` })
//   })
//   .catch(err => res.json(err));
// });

// router.delete('/exercises/:id', (req, res, next)=>{
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)){
//     res.status(400).json({ message: "Specified 'id' is not valid" });
//   };

//   Exercise.findByIdAndRemove(req.params.id)
//   .then(()=>{
//     res.json({ message: `Project with id: ${req.params.id} is removed successfully` })
//   })
//   .catch(err => res.json(err))
// });




module.exports = router;