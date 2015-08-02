var mongoose=require('mongoose');
var schema=mongoose.Schema;
var user_schema=new schema({username: String,password:String,email: String,link:String,posts:Array});
var user = mongoose.connection.model("user",user_schema);
var post_schema=new schema({username: String,Ulink:String,email:String,Plink:String,post:String,comments:{},rating:Number});
var post = mongoose.connection.model("post",user_schema);
exports.post=post;
exports.user=user;