const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signUp = async(req, res)=>{
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if(user) {
      return res.status(400).json({ msg: 'User already exist' });
    }

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt)
    user.password = hashPass;

    await user.save();


    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.SECRET, {
      expiresIn: 7200 //2h
    }, (err, token)=>{
      if(err) throw err;

      res.json(token);
    })
  } catch(err) {
    console.log(err);
    res.status(400).send('There was an error while creating user')
  }
    
};

exports.userAuthentication = async (req, res)=>{
  // passport.authenticate('local', (err, theUser, failureDetails) => {
	// 	if (err) {
	// 		res.status(500).json({ message: 'Something went wrong while authenticating user' });
	// 		return;
	// 	}

	// 	if (!theUser) {
	// 		res.status(401).json({ failureDetails });
	// 		return;
	// 	}

	// 	req.login(theUser, (err) => {
	// 		if (err) {
	// 			res.status(500).json({ message: 'Session save went bad.' });
	// 			return;
	// 		}
	// 		res.status(200).json(theUser);
	// 	});
	// })(req, res, next);

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ msg: 'User do not exist' });
    }
    const correctPass = await bcrypt.compare(password, user.password);
    if(!correctPass) {
      return res.status(400).json({ msg: 'Password incorrect' });
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    
    jwt.sign(payload, process.env.SECRET, {
      expiresIn: '2h'
    }, (err, token)=>{
      if(err) throw err;
      res.json({ token });
    });

  } catch(err) {
    console.log(err);
  };
  
};

exports.authenticatedUser = async (req, res)=>{
  // if(req.isAuthenticated()){
  //   res.status(200).json(req.user);
  //   return;
  // };
  // res.status(403).json({ message: 'Unauthorized' });

  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch(err) {
    console.log(err)
    res.status(500).send({ msg: 'There was an error' });
  }
  
};

exports.userLogout = (req, res)=>{
  req.logout();
	res.status(200).json({ message: 'Log out success! ' });
};