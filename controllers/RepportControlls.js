const mongoose =require('mongoose')

const Parent = require('../models/Parent')
const Doctor = require('../models/Doctor')
const Repport = require('../models/repport')
const jwt = require('jsonwebtoken')
const {handelError} = require('./error_handlers')
const createJWT = (id) =>{
     return jwt.sign({id},'hikarosubahiko',{expiresIn:60*60})
}
module.exports.CreateRepport = (req,res) =>{
     const makerId = req.userId
     console.log(makerId);
     const recieverId = req.params.id
     const content = req.body.feedBack
     const repport  = Repport.create({makerId,content,recieverId})
     const token = createJWT(repport._id)
     res.cookie('jwt',token,{maxAge:60*60*24})
     res.json({
          message : 'rapport created',
          makerId,
          recieverId,
          content
     })

}