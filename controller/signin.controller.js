const userModel = require('../module/user.model')
const bcrypt = require('bcrypt')



module.exports.handelSignIN = async (req,res)=>{
    const {email , password}= req.body
    const user = await userModel.findOne({email})
    if(user != null)
    {
        const match = await bcrypt.compare(password, user.password);
        if(match)
        {
            req.session.userID = user.id
            req.session.name = user.fname
            req.session.isLogedIn = true
            res.redirect('/home')
        }else{
            // res.render('signin.ejs' , {isPassword : false ,isLogedIn:false, isEmail : true , oldValue :{email , password} })
            req.flash('isEmail', 'false')
            req.flash('isPassword' , 'false')
            req.flash('isLogedIn' , 'false')
            req.flash('oldValue' , ['email', 'password'])
            res.redirect('/signin')
        }
    }else{

        // res.render('signin.ejs' , {isPassword : true ,isLogedIn:false, isEmail : false , oldValue :{email , password}})
        req.flash('isEmail' , 'false')
         req.flash('isPassword' , 'false')
        req.flash('isLogedIn' , 'false')
        req.flash('oldValue' , ['email', 'password'])
        res.redirect('/signin')
    }

}


module.exports.signIn = (req,res)=>{
    var isEmail
    var isPassword
    var isLogedIn
    var oldValue
    if(req.flash('isEmail')[0] == 'false' &&
     req.flash('isPassword')[0] == 'false' &&
      req.flash('isLogedIn')[0] == 'false' &&
      req.flash('oldValue')[0] >= [] )
    {
        isEmail = false
        isPassword = false
        isLogedIn = false
        oldValue = true
    }else{
        isEmail = true
        isPassword = true
        isLogedIn = false
        oldValue = false
    }
    res.render('signin.ejs' , {isPassword, isLogedIn, isEmail, oldValue :[]})
}