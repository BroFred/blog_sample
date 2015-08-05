module.exports=function(passport){
	var express=require('express');
	var bodyPaser=require('body-parser');
	var flash=require('connect-flash');
	var Uinfo=require('./schema.js').userInfo;
	var alreadylogin=function(req,res,next){
		if (req.isAuthenticated()){
			res.redirect('/auth/welcome');
		}
		else{
			next();
		}
	}
	var urlbody=bodyPaser.urlencoded({ extended: false }); //passport won't auto parse
	var router = express.Router();
	router.get('/login',flash(),alreadylogin,function(req,res){
		res.render('login',{message:req.flash('message')});
	});
	router.get('/signin',flash(),function(req,res){
		res.render('signin',{message:req.flash('message')});
	});
	router.post('/login',urlbody,flash(),passport.authenticate('login', {
	    successRedirect: 'welcome',
	    failureRedirect: 'login',
	    failureFlash : true 
  	}));
  	router.get('/signout',flash(),function(req,res) {
	  req.logout();
	  res.redirect('/');
	});
  	router.post('/signup', urlbody,flash(),passport.authenticate('signup', {
	    successRedirect: 'welcome',
	    failureRedirect: 'signin',
	    failureFlash : true 
  	}));
  	router.get('/welcome',function(req,res){
  		if(req.user){
  		Uinfo.findOne({link:req.user.link},function(erro,data){
  			res.render('welcome',{username:req.user.username,email:req.user.email,message:undefined,pic:data.img.data.toString('base64'),type:""});
  		});
  		}
  		else{
  			res.redirect('login');
  		}
  	});
	return router;
}