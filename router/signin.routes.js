const signinRoutes = require('express').Router()
const handelSignIn = require('../controller/signin.controller')



signinRoutes.get('/signin', handelSignIn.signIn)

signinRoutes.post('/handleSignin', handelSignIn.handelSignIN)

module.exports=signinRoutes