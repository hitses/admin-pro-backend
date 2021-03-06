const {Router} = require('express');
const {check} = require('express-validator');

const {validateJWT} = require('../middlewares/validation-jwt');
const {valCamps} = require('../middlewares/validation');

const {login, googleLogIn, tokenRenew} = require('../controllers/auth');

const router = Router();

const validate = [
  check('pass', 'Password is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  valCamps
];
const validateGoogle = [
  check('token', 'Token is required').not().isEmpty(),
  valCamps
];

router.post('/', validate, login);
router.get('/renew', validateJWT, tokenRenew);
router.post('/google', validateGoogle, googleLogIn);

module.exports = router;