var mongoose=require('mongoose');
var schema=mongoose.Schema;
var user_schema=new schema({username: String,password: String,email: String,link:String});
var user = mongoose.connection.model("user",user_schema);
exports.user=user;