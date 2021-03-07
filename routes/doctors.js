const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');
const {validateJWT} = require('../middlewares/validation-jwt');

const {getDoctors, postDoctor, putDoctor, delDoctor} = require('../controllers/doctors');

const router = Router();

const validatePost = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('hospital', 'Invalid Mongo ID').isMongoId(),
  /* check('pass', 'Password is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(), */
  valCamps
];

const validatePut = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  valCamps
]

router.get('/', /* validateJWT, */ getDoctors);
router.post('/', validatePost, postDoctor);
router.put('/:id', /* validatePut, */ putDoctor);
router.delete('/:id', /* validateJWT, */ delDoctor);

module.exports = router;