const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const resultController = require('../controllers/resultController');
const { check } = require('express-validator');


router.post('/', 
  auth, 
  [
    check('exercise', 'Must be provided a valid exercise id').not().isEmpty()
  ], 
  resultController.createResult
);

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
  [
    check('reps', 'Must provide a valid "reps" value').not().isEmpty(),
    check('time', 'Must provide a valid "time" value').not().isEmpty(),
    check('weight', 'Must provide a valid "weight" value').not().isEmpty()
  ],
  resultController.editResult
);

//delete result
router.delete('/:id',
  auth, 
  resultController.deleteResult
);


module.exports = router;


