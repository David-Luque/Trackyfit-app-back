// routes/auth-routes.js

const express = require('express');
const authRoutes = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../models/User');

// authRoutes.post('/signup', (req, res, next) => {
// 	const username = req.body.username;
// 	const password = req.body.password;

// 	if (!username || !password) {
// 		res.status(400).json({ message: 'Provide username and password' });
// 		return;
// 	}

// 	if (password.length < 7) {
// 		res
// 			.status(400)
// 			.json({ message: 'Please make your password at least 8 characters long for security purposes.' });
// 		return;
// 	}

// 	User.findOne({ username }, (err, foundUser) => {
// 		if (err) {
// 			res.status(500).json({ message: 'Username check went bad.' });
// 			return;
// 		}

// 		if (foundUser) {
// 			res.status(400).json({ message: 'Username taken. Choose another one.' });
// 			return;
// 		}

// 		const salt = bcrypt.genSaltSync(10);
// 		const hashPass = bcrypt.hashSync(password, salt);

// 		const aNewUser = new User({
// 			username: username,
// 			password: hashPass
// 			// leidos: [''],
// 			// leyendo: [''],
// 			// porLeer: ['']
// 		});

// 		aNewUser.save((err) => {
// 			if (err) {
// 				res.status(400).json({ message: 'Saving user to database went wrong.' });
// 				return;
// 			}

// 			// Automatically log in user after sign up
// 			// .login() here is actually predefined passport method
// 			req.login(aNewUser, (err) => {
// 				if (err) {
// 					res.status(500).json({ message: 'Login after signup went bad.' });
// 					return;
// 				}

// 				// Send the user's information to the frontend
// 				// We can use also: res.status(200).json(req.user);
// 				res.status(200).json(aNewUser);
// 			});
// 		});
// 	});
// });

authRoutes.post('/signup', (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: 'Provide username and password' });
		return;
	}

	if (password < 4) {
		res.status(400).json({ message: 'Please make your password bigger' });
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
							.then((result) => {
								res.send({ message: 'Usuario creado con exito' });
							});
					});
				});
			} else {
				res.send({ errorMessage: 'El username introducido ya existe' });
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
			res.status(500).json({ message: 'Something went wrong authenticating user' });
			return;
		}

		if (!theUser) {
			// "failureDetails" contains the error messages
			// from our logic in "LocalStrategy" { message: '...' }.
			console.log('error 83: no hay usuario');
			res.status(401).json(failureDetails);
			return;
		}

		// save user in session
		req.login(theUser, (err) => {
			if (err) {
				console.log('91: hay usuario pero hay error');
				res.status(500).json({ message: 'Session save went bad.' });
				return;
			}
			console.log('95', theUser);
			// We are now logged in (that's why we can also send req.user)
			res.send(theUser);
		});
	})(req, res, next);
});

// authRoutes.post('/login', passport.authenticate("local", {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: false,
//   passReqToCallback: true
// }))

authRoutes.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ message: 'Log out success! ' });
});

authRoutes.get('/loggedin', (req, res, next) => {
	if (req.isAuthenticated()) {
		res.status(200).json(req.user);
		return;
	}
	res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;
