module.exports=function(passport){
	var express=require('express');
	var bodyPaser=require('body-parser');
	var flash=require('connect-flash');
	var urlbody=bodyPaser.urlencoded({ extended: false }); //passport won't auto parse
	var router = express.Router();
	router.post('/login',urlbody,flash(),passport.authenticate('login', {
	    successRedirect: '/',
	    failureRedirect: '/',
	    failureFlash : true 
  	}));
  	/*router.post('/signup', passport.authenticate('signup', {
	    successRedirect: '/',
	    failureRedirect: '/',
	    failureFlash : true 
  	}));*/
	return router;
}