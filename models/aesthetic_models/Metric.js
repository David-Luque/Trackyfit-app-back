const mongoose = require('mongoose')
const Schema = mongoose.Schema

const metricSchema = new Schema({
  name: {
    type: String, 
    required: true,
    trim: true
  },
  unit: {
    type: String, 
    required: true,
    trim: true
  },
  measures: [{
    type: Schema.Types.ObjectId, 
    ref: 'Measure'
  }],
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

module.exports = mongoose.model('Metric', metricSchema);