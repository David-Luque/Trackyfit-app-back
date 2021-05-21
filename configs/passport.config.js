const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const session = require('express-session');

passport.serializeUser((user, next) => {
	next(null, user._id);
});

passport.deserializeUser((id, next) => {
	User.findById(id)
		.then((theUser) => next(null, theUser))
		.catch((err) => next(err));
});

passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
		User.findOne({ username }, (err, user) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(null, false, { message: 'Incorrect username' });
			}
			if (!bcrypt.compareSync(password, user.password)) {
				return next(null, false, { message: 'Incorrect password' });
			}
			return next(null, user);
		});
}));
