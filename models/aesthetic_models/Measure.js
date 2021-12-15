const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measureSchema = new Schema({
  quantity: {
    type: Number, 
    required: true, 
    min: 0
  },
  date: {
    type: Date, 
    default: Date.now()
  },
  metric: {
    type: Schema.Types.ObjectId, 
    ref: 'Metric'
  }
});

module.exports = mongoose.model('Measure', measureSchema);