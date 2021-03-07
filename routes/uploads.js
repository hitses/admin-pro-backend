const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const {validateJWT} = require('../middlewares/validation-jwt');
const {fileUpload, downloadImg} = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:document/:id', validateJWT, fileUpload);
router.get('/:document/:file', validateJWT, downloadImg);

module.exports = router;