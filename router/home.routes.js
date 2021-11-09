const homeRoutes = require('express').Router()
const userModel = require('../module/user.model')
const noteModel = require('../module/note.model')
const auth = require('../auth/auth')

homeRoutes.get('/home', auth, async(req, res) => {
    const note = await noteModel.find({userID :req.session.userID })
    res.render('index.ejs' ,{name : req.session.name , isLogedIn : req.session.isLogedIn , note})
});


homeRoutes.post('/addNote',async (req,res)=>{

   const {title , desc} = req.body
   await noteModel.insertMany({title , desc , userID :req.session.userID })
    res.redirect('/home')
})

homeRoutes.post('/handelDelete',async (req,res)=>{
    console.log();
    await noteModel.findByIdAndDelete({ _id:req.body.delete})
    res.redirect('/home')
})

homeRoutes.post('/editNote' ,async (req,res)=>{
    await noteModel.findByIdAndUpdate({_id : req.body.edit},{title : req.body.title , desc:req.body.desc})
    res.redirect('/home')
})

homeRoutes.get('/logOut' , (req,res)=>{
    req.session.destroy((err)=>{
       res.redirect('/signin')
    })
})


module.exports= homeRoutes