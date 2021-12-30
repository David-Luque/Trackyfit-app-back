const Measure = require('../models/aesthetic_models/Measure');
const Metric = require('../models/aesthetic_models/Metric');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.createMeasure = async (req, res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const { metric } = req.body;
    const metricDB = await Metric.findById(metric);

    if(!metricDB) res.status(404).json({ msg: "Metric not found" });
    if(metricDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const measure = new Measure(req.body);
    await measure.save();

    await Metric.findByIdAndUpdate(metric, { $push: { measures: measure._id } })

    res.json(measure);

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while creating measure')
  }
};

exports.getMeasures = async (req, res)=>{

  try {
    const { metric } = req.body

    const metricDB = await Metric.findById(metric);
    
    if(!metricDB) res.status(404).json({ msg: 'Metric not found' });
    if(metricDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const measures = await Measure.find({ metric }).sort({ date: -1 });

    res.json(measures);


  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while requesting metric measures');
  }
  
};

exports.editMeasure = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }

  try {
    const { quantity, metric } = req.body;

    const metricDB = await Metric.findById(metric);

    if(!metricDB) res.status(404).json({ msg: 'Metric not found' });
    if(metricDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const newMeasure = {};
    if(quantity) newMeasure.quantity = quantity;

    const measure = Measure.findByIdAndUpdate(req.params.id, newMeasure, { new: true });
    res.json(measure);

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while updating measure')
  }
};

exports.deleteMeasure = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  try {
    const { metric } = req.body;

    const metricDB = await Metric.findById(metric);

    if(!metricDB) res.status(404).json({ msg: 'Metric not found' });
    if(metricDB.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    Measure.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Measure successfully deleted' });
    
  } catch(err) {
    console.log(err);
    res.status(500).send('There was an error while deleting measure');
  };
};