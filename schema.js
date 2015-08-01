var mongoose=require('mongoose');
var schema=mongoose.Schema;
var user_schema=new Schema({username: String,password: String,email: String});
var user = mongoose.connection.model("user",user_schema);
exports.user=user;