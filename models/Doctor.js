const mongoose =require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
const doctorSchema = mongoose.Schema({
     fullName : {
          type: String,
          required: [true,'please enter a name'],
          unique:true,
          lowercase:true,

     },
     email: {
          type:String,
          required: [true,'please enter an email'],
          unique:true,
          lowercase:true,
          validate:[isEmail,'please enter a valid email']
     },
     password :{
          type:String,
          required: [true,'please enter a password'],
          minlength :[8,'you should at least input 8 charachters']
     },
     PaymentMethod:{
          type:String,
          required:[true,'input payment method']
     },
     experience:{
          type:Number,
          required:true,
     },
     state: {
          type:String,
          required:[true,'input your state'],
     },
     degree:{
          type:String,
          required:[true,'please enter kid image'],
     },
     doctorImage:{
          type:String,
          required:[true,'insert your image']
     },
     description:{
          type:String,
          required:[true,'tell us more about you']
     }
})

//hashing passwords
doctorSchema.pre('save',async function (next){
     const salt1 = await bcrypt.genSalt()
     const salt2 = await bcrypt.genSalt()
     this.password = await bcrypt.hash(this.password,salt1)
     this.PaymentMethod = await bcrypt.hash(this.PaymentMethod,salt2)
     next()
})
//login :
doctorSchema.statics.login = async function(email,password){
     //the this key word here refers to the model not the instance :
     const doctor = await this.findOne({email})
     if(doctor ){
          const auth = await bcrypt.compare(password,doctor.password)
          if(auth){
               return doctor
          }
          throw Error('inncorect password')
     }
     throw Error('email not found')
}
module.exports = mongoose.model('doctor',doctorSchema)