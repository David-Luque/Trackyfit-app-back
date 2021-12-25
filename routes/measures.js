const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const measureController = require('../controllers/measureController');
const { check } = require('express-validator');

router.post('/', 
  auth, 
  [
    check('quantity', 'Must provide a valid "quantity" value').not().isEmpty()
  ], 
  measureController.createMeasure
);


//route to get all measures
//remove '.populate' in metric route?
router.get('/', 
  auth, 
  resultController.getMeasures
);

//route to get all data for specific measure instead of get all info from all measures in route above?
//In that case, in route above only provide minimal info for display overview info of metric measures


//update result
router.put('/:id', 
  auth, 
  resultController.editMeasure
);

//delete result
router.delete('/:id',
  auth, 
  resultController.deleteMeasure
);


module.exports = router;