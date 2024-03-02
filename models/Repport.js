const mongoose =require('mongoose')
const reportSchema = mongoose.Schema({
     madeBy:{
          type: String,
          required:[ true,'who made this repport']
     },
     feedBack :{
          type:String,
          required:[true,'insert your feedback'],
          minlength : [30,'add more feedBack']
     },
     madeTo:{
          type:String,
          required:[true,'who is the repport made to']
     }
})
const Repport = mongoose.model('repport',reportSchema)
module.exports = Repport