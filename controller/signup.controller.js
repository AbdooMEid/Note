
const userModel = require('../module/user.model')
const {check,validationResult}=require('express-validator')
const bcrypt = require('bcrypt');





module.exports.signUp = async(req,res)=>{
  var isEmail
  var isPassword
  var isLogedIn
  var oldValue
  var error
  if(req.flash('isEmail')[0] == 'false' &&
   req.flash('isPassword')[0] == 'false' &&
    req.flash('isLogedIn')[0] == 'false' )
  {
      isEmail = false
      isPassword = false
      isLogedIn = false
      oldValue = false
      error = true
  }else{
      isEmail = true
      isPassword = true
      isLogedIn = false
      oldValue = false
      error = true
  }
  res.render('signup.ejs' , {isLogedIn, error : [] , oldValue})
}

module.exports.coHandelSignUp = async (req,res)=>{
    let {fname , lname , email , password , rePassword}= req.body
    const error = validationResult(req)
    if(error.isEmpty())
    { 
      const user =   await userModel.findOne({email})
      if(user == null)
      {
     
        bcrypt.hash(password, 8, async(err, hash)=> {
          await userModel.insertMany({fname, lname , email, password : hash})
          res.redirect('/')
      });
       
      }else{
       // res.render('signup.ejs' , {isLogedIn:false, error:[{param:'exists'}] , oldValue:{fname, lname , email, password , rePassword}})
        req.flash('isEmail', 'false')
        req.flash('isPassword' , 'false')
        req.flash('isLogedIn' , 'false')
        res.redirect('/')
      } 
    }else
    {
       // res.render('signup.ejs' , {isLogedIn:false, error:error.array() , oldValue:{fname, lname , email, password , rePassword}})
        req.flash('isEmail', 'false')
        req.flash('isPassword' , 'false')
        req.flash('isLogedIn' , 'false')
        res.redirect('/')
    }

    
}
