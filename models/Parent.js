const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const ParentSchema = mongoose.Schema({
     fullName : {
          type: String,
          required: [true,'please enter a name'],
          lowercase:true,

     },
     email: {
          type:String,
          required: [true,'please enter an email'],
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
     state: {
          type:String,
          required:[true,'input your state'],
     },
     kidName:{
          type:String,
          required:[true,`please enter you're kid's name`],
          unique:true,
          lowercase:true
     },
     kidAge:{
          type:Number,
          required:[true,'please enter the age of the kid'],
          min:[4,'your kid needs to be lil older ']
     },
     kidDescription:{
          type:String,
          minlength:20,
          requried:[true,'descript your kid condition']
     },
     kidImage:{
          type:String,
          required:[true,'please enter kid image'],
          unique:true
     }
})
//hashing passwords
ParentSchema.pre('save',async function (next){
     const salt1 = await bcrypt.genSalt()
     const salt2 = await bcrypt.genSalt()
     this.password = await bcrypt.hash(this.password,salt1)
     this.PaymentMethod = await bcrypt.hash(this.PaymentMethod,salt2)
     next()
})
//static method to login the user :
ParentSchema.statics.login = async function(email,password){
     //the this key word here refers to the model not the instance :
     const parent = await this.findOne({email})
     if(user){
          const auth = await bcrypt.compare(password,user.password)
          if(auth){
               return parent
          }
          throw Error('inncorect password')
     }
     throw Error('email not found')
}
module.exports = mongoose.model('parent',ParentSchema)