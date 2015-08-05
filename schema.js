var mongoose=require('mongoose');
var schema=mongoose.Schema;
var user_schema=new schema({username: String,password:String,email: String,link:String}); //protected
var userInfo_schema=new schema({username:String,email: String,link:String,img:{data:Buffer, contentType:String}}); //public
var comment_schema= new schema({username:String,body:String,rating:Number});
var post_schema=new schema({username: String,Ulink:String,email:String,post:{title:String,body:String},Editon:Date,comments:[comment_schema],rating:Number});
//when post  username,Ulink,email by user. Plink post Editon comments,rating by post. rating and comments should by protected
var user = mongoose.connection.model("user",user_schema); 
var post = mongoose.connection.model("post",post_schema);
var userInfo =mongoose.connection.model("userInfo",userInfo_schema);
exports.post=post;
exports.user=user;
exports.userInfo=userInfo;