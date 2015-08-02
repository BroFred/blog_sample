var express=require('express');
var router =express.Router();
var flash=require('connect-flash');
var isAuthenticate=function(req,res,next){
	if (req.isAuthenticated()){
		req.flash('message','Post!');
		next();
	}
	else{
  		res.redirect('auth/login');
  	}
}
//---> edit post username,Ulink,email,Plink,post
router.get('/edit',flash(),isAuthenticate,function(req,res){
	res.render('edit',{message:req.flash('message')});
});
//---> edit post
//expect public_router to user post info res.get('/user/:ulink')
exports.router=router;