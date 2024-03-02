const express = require('express')
const api = express()
const mongoose = require('mongoose')
const SignUpRouter = require('./routes/Sign-up')
const LogInRouter = require('./routes/Log-in')
const repportRouter = require('./routes/repport')
api.use(express.json())
const DBUI = 'mongodb+srv://hiki:ramziwassim2@cluster0.n1m1jqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DBUI,{
     dbName : 'T-CodeX-DB',
     connectTimeoutMS:2000
}).then(() =>{
     console.log('connected to DB')
     api.listen(5000)
})
api.use('/sign-up',SignUpRouter)
api.use('/log-in',LogInRouter)
api.use("/repport", repportRouter)