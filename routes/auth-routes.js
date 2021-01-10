const express 		= require('express');
const authRoutes 	= express.Router();
const passport 		= require('passport');
const bcrypt 			= require('bcryptjs');
const User 				= require('../models/User');


authRoutes.post('/signup', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.send({ errorMessage: 'Provide username and password' });
		return;
	}

	if (password < 4) {
		res.send({ errorMessage: 'Password must be longer' });
		return;
	}
	User.findOne({ username })
		.then((user) => {
			if (!user) {
				bcrypt.genSalt(10).then((salt) => {
					bcrypt.hash(password, salt).then((hashedPwd) => {
						newUser = {
							username,
							password: hashedPwd
						};
						User.create(newUser)
							.then(() => {
								res.send({ errorMessage: 'User successfully registered' });
							});
					});
				});
			} else {
				res.send({ errorMessage: 'Username already exist' });
			}
		})
		.catch((err) => {
			console.error(err);
		});
});


authRoutes.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, theUser, failureDetails) => {
		if (err) {
			console.log('error 75', err);
			res.status(500).send({ message: 'Something went wrong authenticating user' });
			return;
		}

		if (!theUser) {
			res.send({message: 'Please, insert valid username and password'});
			return;
		}

		req.login(theUser, (err) => {
			if (err) {
				res.status(500).send({ message: 'Session save went bad.' });
				return;
			}
			res.send(theUser);
		});
	})(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).send({ message: 'Log out success! ' });
});

authRoutes.get('/loggedin', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).send(req.user);
		return;
	}
	res.status(403).send({ message: 'Unauthorized' });
});

module.exports = authRoutes;
