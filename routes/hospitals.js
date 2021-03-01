const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');
const {validateJWT} = require('../middlewares/validation-jwt');

const {getHospitales, postHospital, putHospital, delHospital} = require('../controllers/hospitals');

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

router.get('/', /* validateJWT, */ getHospitales);
router.post('/', /* validatePost, */ postHospital);
router.put('/:id', /* validatePut, */ putHospital);
router.delete('/:id', /* validateJWT, */ delHospital);

module.exports = router;