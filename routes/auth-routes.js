const express 		= require('express');
const authRoutes 	= express.Router();
const passport 		= require('passport');
const bcrypt 			= require('bcryptjs');

const User 				= require('../models/User');


authRoutes.post('/signup', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	if (password < 5) {
		res.status(400).json({ message: 'Password must be at least 6 character long' });
		return;
	}

	User.findOne({ username }, (err, foundUser) => {
		
		if(err){
			res.status(500).json({ message: "Username check error" });
			return;
		};

		if(foundUser){
			res.status(400).json({ message: "Username already exist. Please, choose another one" });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			username: username,
			password: hashPass
		});

		newUser.save(err => {
			if(err){
				res.status(400).json({ message: "Error saving user to database" });
				return;
			};

			req.login(newUser, (err)=>{
				if(err){
					res.status(500).json({ message: "Error login after signup" });
					return;
				};

				res.status(200).json(newUser)
			});
		});
	});
});


authRoutes.post('/login', (req, res, next) => {
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


authRoutes.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ message: 'Log out success! ' });
});


authRoutes.get('/loggedin', (req, res, next)=>{
  if(req.isAuthenticated()){
    res.status(200).json(req.user);
    return;
  };
  res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRoutes;
