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


// const exerciseSchema = new Schema ({
//   name: {type: String},
//   data: {type: [data]},
//   owner: {type: Schema.Types.ObjectId, ref: 'User'}
// })

// const data = new Schema ({
//   value: {type: Number},
//   date: {type: Date}
// })



const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise


// // MODEL SKETCH
// {
//   owner: id2343245,
//   exercises: {
//     pushup: [
//       {
//         value: 12, 
//         date: 15/07/1993
//       },{
//         value: 16, 
//         date: 16/07/1993
//       },{
//         value: 18, 
//         date: 17/07/1993
//       }
//     ],
//     pullups: [
//       {
//         value: 12, 
//         date: 15/07/1993
//       },{
//         value: 16, 
//         date: 16/07/1993
//       },{
//         value: 18, 
//         date: 17/07/1993
//       }
//     ],
//     squads: [
//       {
//         value: 12, 
//         date: 15/07/1993
//       },{
//         value: 16, 
//         date: 16/07/1993
//       },{
//         value: 18, 
//         date: 17/07/1993
//       }
//     ]
//   }
// }