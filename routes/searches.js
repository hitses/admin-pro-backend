const {Router} = require('express');
const {check} = require('express-validator');

const {valCamps} = require('../middlewares/validation');
const {validateJWT} = require('../middlewares/validation-jwt');

const {getAll, getCollection} = require('../controllers/searches');

const router = Router();

router.get('/:search', validateJWT, getAll);
router.get('/collection/:document/:search', validateJWT, getCollection);

module.exports = router;