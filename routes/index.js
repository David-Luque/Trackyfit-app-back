const express = require('express');
const User = require('../models/User');
const Metrics = require('../models/Metrics');
const Exercise = require('../models/Exercise');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Hello world!')
});


router.get("/get-all-metrics/:id", (req, res)=>{
  Metrics.find({owner: req.params.id})
  .then((result)=>{
    console.log(result)
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
    res.send(err)
  })
})

router.post('/add-metrics', (req, res)=>{
  const {weight, shoulders, abs, cuadriceps, date, owner} = req.body
  Metrics.create({weight, shoulders, abs, cuadriceps, date, owner})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})


router.get("/get-all-exercises/:id", (req, res)=>{
  Exercise.find({owner: req.params.id})
  .then((result)=>{
    console.log(result)
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
    res.send(err)
  })
})

router.post('/create-exercise', (req, res)=>{
  const {pushUps, pullUps, plank, squats, date, owner} = req.body
  Exercise.create({pushUps, pullUps, plank, squats, date, owner})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})



router.get('/getUser/:id', (req, res)=>{
  User.findById(req.params.id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})



router.get('/all-users', (req, res)=>{
  User.find({})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})





module.exports = router;
