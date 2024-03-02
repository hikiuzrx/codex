const jwt = require('jsonwebtoken')
module.exports.handelError = (error) =>{
     const handelError = (err) =>{
          console.log(err.message, err.code)
          let errors = {email:'',password:'',}
          // handle duplicates: 
          if (err.code === 11000){
               errors.email = 'this email is already registered'
               return errors
          }    
          //validation errors: 
          if(err.message.includes('user validation failed')){
               Object.values(err.errors).forEach(({properties}) =>{
                    errors[properties.path]= properties.message
               })
          }
          // incorrect email:
          if(err.message ==='email not found'){
               errors.email= 'this email is not registered'
               return errors
          }
          //incorrect password : 
          if(err.message ==='incorrect password'){
               errors.password ='wrong password'
               return errors
          }
          return errors
     }
      //
}