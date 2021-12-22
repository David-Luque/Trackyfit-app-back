const { validationResult } = require("express-validator");
const Metric = require('../models/aesthetic_models/Metric');

exports.createMetric = async (req, res)=>{
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) res.status(401).json({ errors: errors.array() })

  try {
    const metric = new Metric(req.body);
    metric.owner = req.user.id;

    await metric.save();

    res.json({ metric });

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while creting metric');
  }
};

exports.getMetrics = async (req, res)=>{

  try {
    const metrics = await Metric.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ metrics });

  } catch (error) {
    console.log(error);
    res.status(500).send('There was an error while searching metrics')
  }
};

exports.searchMetric = async(req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  try {
    const metric = await Metric.findById(req.params.id).populate('measures');
    const measuresCopy = [...metric.measures]
    measuresCopy.sort((a, b)=>{
      return new Date(a.date) - new Date(b.date);
    });
    metric.measures = measuresCopy;
    res.status(200).json( metric );

  } catch (err) {
    console.log(err);
    res.status(500).send('There was an error while searching measure')
  }
};

exports.editMetric = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  try {
    let metric = await Metric.findById(req.params.id);

    if(!metric) res.status(404).json({ msg: 'Metric not found' });
    if (metric.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    const { name, unit } = req.body;
    const newMetric = {};
    if(name) newMetric.name = name;
    if(unit) newMetric.unit = unit;

    metric = Metric.findByIdAndUpdate(req.params.id, { $set: newMetric }, { new: true });
    res.status(200).json(metric);

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'There was an error while updating measure' });
  }
};

exports.deleteMetric = async (req, res)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(400).json({ message: "Specified 'id' is not valid" });
  };

  try {
    let metric = await Metric.findById(req.params.id);

    if(!metric) res.status(404).json({ msg: 'Metric not found' });
    if (metric.owner.toString() !== req.user.id) res.status(401).json({ msg: 'Unauthorized' });

    await Metric.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Measure removed' });

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'There was an error while deleting measure' });
  }
};