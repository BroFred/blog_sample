var express=require('express');
var router =express.Router();
var flash=require('connect-flash');
var post=require('./schema').post;
var uinfo=require('./schema').userInfo;
var bodyPaser=require('body-parser');
var urlbody=bodyPaser.urlencoded({ extended: false });
var formidable = require('formidable');
var fs=require('fs');
var isAuthenticate=function(req,res,next){
	if (req.isAuthenticated()){
		req.flash('message','Post!');
		next();
	}
	else{
  		res.redirect('http:\/\/'+req.headers.host+'/auth/login');
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
router.get('/like/:id',function(req,res){
	post.findOne({_id:req.params.id},function(erro,data){
		data.rating++;
		data.save(function(){
			res.render('postDetail',{post:data});
		});
	});
});
router.post('/addImage',function(req,res){
	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
    	uinfo.findOne({link:req.user.link},function(erro,data){
			data.img.data=fs.readFileSync(files.pic.path);
			fs.unlink(files.pic.path,function (err) {
  				if (err) throw err;
			});
			data.img.contentType='image/png';
			data.save(function(){
				res.render('welcome',{username:req.user.username
					,email:req.user.email
					,message:'save success'
					,pic:data.img.data.toString('base64')
					,type:'image/png'});
			});
		});
    });// set form.uploadDir
});
//when post  username,Ulink,email by user. Plink post Editon comments,rating by post. rating and comments should by protected
//---> edit post
//expect public_router to user post info res.get('/user/:ulink')
exports.router=router;