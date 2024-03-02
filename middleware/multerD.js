// multerConfig.js
const multer = require('multer');

// Storage configuration for profile image
const storageDoctorImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/degreeimage/'); // Destination folder for profile images
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for profile image
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Storage configuration for degree image
const storageDegreeImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/doctorimage/'); // Destination folder for degree images
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for degree image
       
         ;
        cb(null,  `${Date.now()}-${file.originalname}`);
    }
});

// Middleware for profile image
const uploadDoctorImage = multer({ storage: storageDoctorImage }).single('doctorImage'); 

// Middleware for degree image
const uploadDegreeImage = multer({ storage: storageDegreeImage }).single('degreeImage'); 

module.exports = { uploadDoctorImage, uploadDegreeImage };