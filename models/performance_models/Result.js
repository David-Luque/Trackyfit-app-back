const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  reps: {type: Number, min: 0},
  time: {type: Number, min: 0},
  weight: {type: Number, min: 0},
  date: {type: Date, default: Date.now()},
  exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'}
});

const Result = mongoose.model('Result', resultSchema);

module.esports = Result;