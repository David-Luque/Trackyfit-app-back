const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const metricController = require('../controllers/metricController');
const { check } = require('express-validator');

router.post('/', 
  auth, 
  [
    check('name', 'Must provide a valid name').not().isEmpty(),
    check('unit', 'Must provide a valid unit').not().isEmpty()
  ], 
  metricController.createMetric
);

router.get('/', 
  auth,  
  metricController.getMetrics
);

router.get('/:id', 
  auth, 
  metricController.searchMetric
);

router.put('/:id', 
  auth, 
  [
    check('name', 'Must provide a valid measure name').not().isEmpty(),
    check('unit', 'Must provide a valid measure unit').not().isEmpty()
  ], 
  metricController.editMetric
);

router.delete('/:id', 
  auth, 
  metricController.deleteMetric
);



module.exports = router;