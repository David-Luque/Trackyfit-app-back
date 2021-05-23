const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
  quantity: {type: Number, required: true},
  date: {type: Date, default: Date.now()},
  metric: {type: Schema.Types.ObjectId, ref: 'Metric'}
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;