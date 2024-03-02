const express = require('express')
const {PostLogInDoctor, PostLogInParent} = require('../controllers/authenController')
const router = express.Router()
router.route('/parent').post(PostLogInParent)
router.route('/doctor').post(PostLogInDoctor)
module.exports = router