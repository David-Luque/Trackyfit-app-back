const mongoose = require('mongoose')
const Schema = mongoose.Schema

const metricSchema = new Schema({
  name: {type: String},
  measurements: [{type: Schema.Types.ObjectId, ref: 'Measurement'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Metric = mongoose.model('Metric', metricSchema)

module.exports = Metric;