const mongoose = require('mongoose')
const Schema = mongoose.Schema

const metricSchema = new Schema({
  name: {type: String, required: true},
  unit: {type: String, required: true},
  measures: [{type: Schema.Types.ObjectId, ref: 'Measure'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Metric = mongoose.model('Metric', metricSchema)

module.exports = Metric;