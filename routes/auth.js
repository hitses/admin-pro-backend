const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');

const {login} = require('../controllers/auth');

const router = Router();

const validatePost = [
  check('pass', 'Password is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  valCamps
];

router.post('/', validatePost, login);

module.exports = router;