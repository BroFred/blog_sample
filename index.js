var express=require('express');
var app=express();
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/test'); //DB connection 
var passport = require('./strategy.js').passport;
var expressSession = require('express-session');
app.set('view engine', 'ejs'); 
app.use(express.static('./public'));
app.use(expressSession({secret: 'mySecretKey','saveUninitialized':false,'resave': false}));
app.use(passport.initialize());
app.use(passport.session());
var router=require('./Auth_router')(passport);
var prouter=require('./protectedRouter').router; //private router
var purouter=require('./publicRouter').router; //public router 
app.use('/private',prouter); //private
app.use('/auth',router); //authenticate
app.use('/public',purouter); //public
exports.app=app;
