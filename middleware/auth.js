const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  
  const token = req.header('x-auth-token');

  if(!token) {
    res.status(401).json({ msg: 'Invalid permission' });
  }

  try {
    const encrypted = jwt.verify(token, process.env.SECRET);
    req.user= encrypted.user;
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token not valid' });
  };
};