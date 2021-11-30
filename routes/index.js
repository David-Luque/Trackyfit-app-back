const express   = require('express');
const User      = require('../models/User');
const Metrics   = require('../models/aesthetic_models/Metric');
const Exercise  = require('../models/performance_models/Exercise');
const router    = express.Router();

router.get('/', () => "Hello worldlol!!");

//router.get('/', (req, res, next) => {});

// router.get("/get-all-metrics/:id", (req, res)=>{
//   Metrics.find({owner: req.params.id})
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     res.send(err)
//   })
// })

// router.post('/add-metrics', (req, res)=>{
//   const {weight, shoulders, abs, cuadriceps, date, owner} = req.body
//   Metrics.create({weight, shoulders, abs, cuadriceps, date, owner})
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     res.send(err)
//   })
// })

// router.get('/getUser/:id', (req, res)=>{
//   User.findById(req.params.id)
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     res.send(err)
//   })
// })


module.exports = router;
