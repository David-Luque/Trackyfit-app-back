const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  results: [{
      type: Schema.Types.ObjectId, 
      ref: 'Result'
    }],
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema);