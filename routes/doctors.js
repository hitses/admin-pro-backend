const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');
const {validateJWT} = require('../middlewares/validation-jwt');

const {getDoctors, postDoctor, putDoctor, delDoctor} = require('../controllers/doctors');

const router = Router();

const validate = [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('hospital', 'Invalid Mongo ID').isMongoId(),
  valCamps
];

router.get('/', validateJWT, getDoctors);
router.post('/', validate, postDoctor);
router.put('/:id', validate, putDoctor);
router.delete('/:id', validateJWT, delDoctor);

module.exports = router;