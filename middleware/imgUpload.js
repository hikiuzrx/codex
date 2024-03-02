const {uploadImageToCloudinary} = require('cloudinary')
module.exports= async function handleImgUrlRequiredFile(req, res, next){
     if(req.file){
               const pathToremove = req.file.path
               const image_url= await  uploadImageToCloudinary(req.file)
               req.body.image_url = image_url
               fs.unlink(pathToremove, (err) => {
                 if (err) {
                  return res.status(500).send('Error removing temp file');
                 } 
               });
     
             next()
            
     }else{
         return res.status(400).json({messgae:"image file missing"})
     }
     
 };