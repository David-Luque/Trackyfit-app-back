const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const measureController = require('../controllers/measureController');
const { check } = require('express-validator');

router.post('/', (req, res, next)=>{
  
  const { quantity, date, metric } = req.body.theMeasure;
  const quantityNumber = Number(quantity);

  Measure.create({ 
    quantity: quantityNumber, 
    date, 
    metric 
  })
  .then(response => {
    //console.log(response)
    return Metric.findByIdAndUpdate(metric, { $push: {measures: response._id} })
    .then(theResponse => {
      res.json(theResponse)
    })
    .catch(err => res.json(err))
  })
  .catch(err => res.json(err))
});


//route to get all results
//remove '.populate' in exercise route?
router.get('/', 
  auth, 
  resultController.getResults
);

//route to get all data for specific result instead of get all info from all results in route above?
//In that case, in route above only provide minimal info for display overview info of exercise results


//update result
router.put('/:id', 
  auth, 
  resultController.editResult
);

//delete result
router.delete('/:id',
  auth, 
  resultController.deleteResult
);


module.exports = router;