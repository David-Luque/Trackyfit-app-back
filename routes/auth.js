const express 		= require('express');
const authRouter 	= express.Router();
const { check } = require('express-validator');
//const passport 		= require('passport');
const authController = require('../controllers/authController');


authRouter.post('/signup', [
	check('username', 'Username is required').not().isEmpty(),
	check('email', 'Provide a valid email').isEmail(),
	check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], authController.signUp
);

authRouter.post('/login', [
	check('email', 'Provide a valid email').isEmail()
], authController.userAuthentication);

authRouter.get('/loggedin', authController.authenticatedUser);

authRouter.post('/logout', authController.userLogout);


module.exports = authRouter;