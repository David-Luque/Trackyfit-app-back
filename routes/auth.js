const express 		= require('express');
const router 	= express.Router();
const { check } = require('express-validator');
//const passport 		= require('passport');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


router.post('/signup', 
	[
		check('username', 'Username is required').not().isEmpty(),
		check('email', 'Provide a valid email').isEmail(),
		check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
	], 
	authController.signUp
);

router.post('/login', 
	[
		check('email', 'Provide a valid email').isEmail()
	], 
	authController.userAuthentication
);

router.get('/loggedin', 
	auth, 
	authController.authenticatedUser
);


module.exports = router;