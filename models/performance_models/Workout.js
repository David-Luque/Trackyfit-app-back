const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String, 
    required: true,
    trim: true
  },
  date: {
    type: Date, 
    default: Date.now()
  },
  data: [{
    exercise: {
      type: Schema.Types.ObjectId, 
      ref: 'Exercise'
    },
    result: {
      type: Schema.Types.ObjectId, 
      ref: 'Result'
    }
  }],
  owner: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
});

module.exports = mongoose.model('Workout', workoutSchema);