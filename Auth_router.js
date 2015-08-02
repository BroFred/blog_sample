module.exports=function(passport){
	var express=require('express');
	var bodyPaser=require('body-parser');
	var flash=require('connect-flash');
	/*
	var isAuthenticate=function(req,res,next){
		if (req.isAuthenticated()){
			return next();
		}
  		res.redirect('/');
	}
	*/ //expect move to request router
	var urlbody=bodyPaser.urlencoded({ extended: false }); //passport won't auto parse
	var router = express.Router();
	router.post('/login',urlbody,flash(),passport.authenticate('login', {
	    successRedirect: '/',
	    failureRedirect: '/',
	    failureFlash : true 
  	}));
  	router.get('/signout',flash(),function(req,res) {
	  req.logout();
	  res.redirect('/');
	});
  	router.post('/signup', urlbody,flash(),passport.authenticate('signup', {
	    successRedirect: '/',
	    failureRedirect: '/',
	    failureFlash : true 
  	}));
  	//expect redirect fix (flash message)
  	//expect add signin login  home page and signout button
	return router;
}