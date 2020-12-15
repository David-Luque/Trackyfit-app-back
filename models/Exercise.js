const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  pushUps: {type: Number},
  pullUps: {type: Number},
  plank: {type: Number},
  squats: {type: Number},
  date: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise