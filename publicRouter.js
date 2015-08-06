var express=require('express');
var router = express.Router();
var Post=require('./schema.js').post;
var Uinfo=require('./schema.js').userInfo;
router.get('/posts/:page',function(req,res){
	var t=Post.find().skip(req.params.page*10).limit(10);
	var temp=[];
	t.exec(function(erro,data){
		temp=data.map(function(a){return [a.post.title,a._id]});
		res.render('post',{posts:temp});
	});
});
router.get('/postsDetail/:id',function(req,res){
	Post.findOne({_id:req.params.id},function(erro,data){
		res.render('postDetail',{post:data});
	});
});
router.get('/author/:link',function(req,res){
	Uinfo.findOne({link:req.params.link},function(erro,u){
		Post.find({Ulink:req.params.link},{'_id':1,'post.title':1},function(erro,p){
			res.render('authorInfo',{info:u,post:p});
		});
	});
});
exports.router=router;