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

// const data = new Schema ({
//   value: {type: Number},
//   date: {type: Date}
// })

// const singleMetric = new Schema ({
//   name: {type: String},
//   info: {type: [data]}
// })

// const metricSchema = new Schema({
//   owner: {type: Schema.Types.ObjectId, ref: 'User'},
//   exercises: {type: [singleMetric]}
// })


const Metrics = mongoose.model('Metrics', metricSchema)

module.exports = Metrics