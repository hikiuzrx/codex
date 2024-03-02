const express = require('express')
const { CreateRepport } = require('../controllers/RepportControlls')
const isAuth  = require('../middleware/isAuth')
const router = express.Router()

router.post("/", isAuth, CreateRepport)

module.exports = router