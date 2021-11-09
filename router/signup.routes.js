const signupRoutes = require('express').Router()
const controllerSignup = require('../controller/signup.controller')
const {check,validationResult}=require('express-validator')
const bcrypt = require('bcrypt');


signupRoutes.get('/', controllerSignup.signUp)

signupRoutes.post('/handleSignUp', check('fname').matches(/[A-Z][a-z]*/),
check('lname').matches(/[A-Z][a-z]*/),
check('email').isEmail(),
check('password').matches(/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/),
check('rePassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      return false;
    }
      return true;
  }) , controllerSignup.coHandelSignUp)
module.exports=signupRoutes


    
        