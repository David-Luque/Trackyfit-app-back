const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measureSchema = new Schema({
  quantity: {type: Number, required: true, min: 0},
  date: {type: Date, default: Date.now()},
  metric: {type: Schema.Types.ObjectId, ref: 'Metric'}
});

const Measure = mongoose.model('Measure', measureSchema);

module.exports = Measure;