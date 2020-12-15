const mongoose = require('mongoose')
const Schema = mongoose.Schema

const metricSchema = new Schema({

  weight: {type: Number},
  shoulders: {type: Number},
  abs: {type: Number},
  cuadriceps: {type: Number},
  date: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Metrics = mongoose.model('Metrics', metricSchema)

module.exports = Metrics