const multer = require('multer')
const Parent = require('../models/Parent')
const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, 'images/kidImage/') // Destination folder for uploaded files
     },
     filename: function (req, file, cb) {
         cb(null, `${Date.now()}-${file.originalname}`) // Filename will be fieldname-currentTimestamp
     }
 });
 
   const upload = multer({storage})
module.exports = upload