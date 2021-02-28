const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');
const {validateJWT} = require('../middlewares/validation-jwt');

const {getUsuarios, postUsuarios, putUsuarios, delUsuarios} = require('../controllers/users');

const router = Router();

const validatePost = [
  check('name', 'Name is required').not().isEmpty(),
  check('pass', 'Password is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  valCamps
];

const validatePut = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  valCamps
]

router.get('/', validateJWT, getUsuarios);
router.post('/', validatePost, postUsuarios);
router.put('/:id', validatePut, putUsuarios);
router.delete('/:id', validateJWT, delUsuarios);

module.exports = router;