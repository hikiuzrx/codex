const mongoose =require('mongoose')
const { uploadDoctorImage, uploadDegreeImage } = require('../middleware/multerD');
const Parent = require('../models/Parent')
const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken')
const {handelError} = require('./error_handlers')
// create JWT :
const createJWT = (id) =>{
     return jwt.sign({id},'hikarosubahiko',{expiresIn:60*60})
 }
// sign up handlers : 
module.exports.PostSignUpParent =async (req,res) =>{
      console.log(req.body,req.file.path)
     const {email,password,PaymentMethod,state,kidName,kidAge,kidDescription} = req.body
     const fullName = req.body.fullName
     const kidImage = req.file.path
     try {
          const parent = await Parent.create({fullName,email,password,PaymentMethod,state,kidName,kidAge,kidDescription,kidImage})
          const token = createJWT(parent._id)
          res.cookie('jwt',{maxAge:1000*60*60*24*365})
          res.status(201).json({parent:parent._id})
     } catch (error) {
        console.log(error)
          errors = handelError(error)
          res.status(400).json({errors})
     }
}
module.exports.PostSignUpDoctor = async (req, res) => {
     const { fullName, email, password, PaymentMethod, experience, state, degree, description } = req.body;
 
                const doctorImage = req.file.path
 
             // Create new Doctor object
             try {
                const doctor = await Doctor.create({ fullName, email, password, PaymentMethod, experience, state, degree, doctorImage, description })
                 const token = createJWT(doctor._id);
                 res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // Set token in cookie
                 res.status(201).json({ doctor: doctor._id });
             } catch (error) {
                console.log(error)
                 const errors = handelError(error); // Corrected spelling mistake
                 res.status(400).json({ errors });
             }

 };
 module.exports.PostLogInParent = async (req,res)=>{
    const {email,password} = req.body
    try {
         const parent = await Parent.login(email,password)
         const token = createJWT(parent._id)
         res.cookie('jwt',token,{maxAge: 1000*60*60*24*365})
         res.status(201).json({parent:parent._id, token})
    } catch (error) {

         res.status(400).json({error : error.message})
    }

 }
 module.exports.PostLogInDoctor = async (req,res)=>{
    console.log(req.body)

    const {email,password} = req.body
    console.log(req.body)
    try {
         const doctor = await Doctor.login(email,password)
         console.log(doctor);
         const token = createJWT(doctor._id)
         res.cookie('jwt',token,{maxAge: 1000*60*60*24*365})
         res.status(201).json({doctor:doctor._id, token})
    } catch (error) {

         res.status(400).json({error : error.message})
    }

 }