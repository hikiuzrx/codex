const jwt = require("jsonwebtoken")

module.exports= function isAuth(req,res,next) {
     const token = req.headers.authorization
     if(!token) {
          res.json({
               message : "Unauthorized"
          })
     }

     const accessToken = jwt.verify(token, 'hikarosubahiko')
     if(!accessToken) {
          res.json({
               message : "Unauthorized"
          })
     }
console.log(accessToken);
     req.userId = accessToken.id 
     next()


}