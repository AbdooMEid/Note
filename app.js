const express = require('express')
const app  = express()
const path = require('path')
const port = 3001
const mongoose = require('mongoose');
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var flash = require('connect-flash');
var store = new MongoDBStore({
  uri: 'mongodb+srv://admin:admin@cluster0.7fbmc.mongodb.net/noteDB',
  collection: 'mySessions'
});
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365} // 1 week
    }))
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(flash());
app.use(require('./router/home.routes'))
app.use(require('./router/signin.routes'))
app.use(require('./router/signup.routes'))
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin:admin@cluster0.7fbmc.mongodb.net/noteDB');
app.listen(process.env.PORT ||port , ()=>{
    console.log('Server Is Running...............');
})