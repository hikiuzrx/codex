const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const { PostSignUpParent, PostSignUpDoctor } = require('../controllers/authenController');

// Route for parent sign-up
router.route('/parent')
    .post(upload.single('kidImage'),PostSignUpParent);



router.route('/doctor')
    .post(upload.single('doctorImage'), PostSignUpDoctor);

module.exports = router;