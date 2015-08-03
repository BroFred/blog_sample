var express=require('express');
var router =express.Router();
var flash=require('connect-flash');
var post=require('./schema').post;
var bodyPaser=require('body-parser');
var urlbody=bodyPaser.urlencoded({ extended: false });
var isAuthenticate=function(req,res,next){
	if (req.isAuthenticated()){
		req.flash('message','Post!');
		next();
	}
	else{
  		res.redirect('../auth/login');
  	}
}
router.use(flash());
router.use(isAuthenticate);
//---> edit post username,Ulink,email,Plink,post
router.get('/edit',function(req,res){
	res.render('edit',{message:req.flash('message')});
});
router.post('/post',urlbody,function(req,res){
	var Newpost=new post();
	Newpost.post.title=req.body.title;
	Newpost.username=req.user.username;
	Newpost.email=req.user.email;
	Newpost.post.body=req.body.body;
	Newpost.Editon=new Date();
	Newpost.comments=[];
	Newpost.rating=0;
	Newpost.save(function(err){
		if(erro){
			throw erro;
		}
	});
	res.render('edit',{message:'post success!'})

});
//when post  username,Ulink,email by user. Plink post Editon comments,rating by post. rating and comments should by protected
//---> edit post
//expect public_router to user post info res.get('/user/:ulink')
exports.router=router;