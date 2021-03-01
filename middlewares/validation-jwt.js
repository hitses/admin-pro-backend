const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {return res.status(401).json({msg: 'Token not found'})}

  try {
    const {userId} = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({msg: 'Invalid token'});
  }
}

module.exports = {
  validateJWT
}