var express=require('express');
var router = express.Router();
var Post=require('./schema.js').post;
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
exports.router=router;