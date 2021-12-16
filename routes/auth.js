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


authRouter.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			res.status(500).json({ message: 'Something went wrong while authenticating user' });
			return;
		}

		if (!theUser) {
			res.status(401).json({ failureDetails });
			return;
		}

		req.login(theUser, (err) => {
			if (err) {
				res.status(500).json({ message: 'Session save went bad.' });
				return;
			}
			res.status(200).json(theUser);
		});
	})(req, res, next);
});


authRouter.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ message: 'Log out success! ' });
});


authRouter.get('/loggedin', (req, res, next)=>{
  if(req.isAuthenticated()){
    res.status(200).json(req.user);
    return;
  };
  res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRouter;