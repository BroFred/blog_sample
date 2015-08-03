var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./schema.js').user;
var UserInfo=require('./schema.js').userInfo;
var bcrypt=require('bcrypt');
var Q=require('q');
//------------------------>
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
//--------------------------->
/*
user._id --> req.session.passport.user 
find(user_id,user);
user --> req.user
*/
//---> signUp strategy
passport.use('signup',new LocalStrategy({usernameField: 'username',passwordField: 'password', passReqToCallback : true},
	function(req,username,password,done){
		var saveUser=function(){
			User.findOne({'username':username},function(err,user){
				if(err){
					console.log('save erro');
					return done(err);
				}
				if(user){
					console.log('user already exist');
					return done(null,false,req.flash('message','user already exist'));
				}
				else{
					var NewUserInfo =new UserInfo();
					var NewUser = new User(); 
					NewUser.username=username;
					NewUserInfo.username=username;
					NewUser.email=req.body.email||'';
					NewUserInfo.email=req.body.email||'';
					NewUser.posts=[];
					//-->convert node style to Q
					var bcryptSalt = Q.denodeify(bcrypt.genSalt);
					var bcrypthash = Q.denodeify(bcrypt.hash);
					//var saveDb=Q.denodeify(NewUser.save);
					var saveDb=function(ob){
						var deferred=Q.defer();
						ob.save(deferred.makeNodeResolver())
						return deferred.promise;
					};
					//-->convert node style to Q
					bcryptSalt(10).then(function(salt){
						return bcrypthash(password,salt);
						
					})
					.then(function(hash){
						NewUser.password=hash;
						return bcrypthash(NewUser.email,1)
					})
					.then(function(hash) {
						NewUserInfo.link=hash;
						NewUser.link=hash;
						return saveDb(NewUserInfo);
					})
					.then(function(){
						return saveDb(NewUser);
					})
					.then(function(){
						//---->newuser save start
						return done(null,NewUser);
						//--->new user save end
					});
				}
			}); 
		};
		process.nextTick(saveUser);
	})
);
//--> signup
//--> login
passport.use('login',new LocalStrategy({ usernameField: 'username',passwordField: 'password',passReqToCallback :true},
	function(req,username,password,done){
		User.findOne({'username':username},function(erro,user){
			if(erro){
				console.log('erro login');
				done(erro);
			}
			if(!user){
				console.log('user not exist');
				done(null,false,req.flash('message','user not exist'));
			}
			else{
				bcrypt.compare(password,user.password,function(erro,res){
					if(res){
						console.log('login success');
						done(null,user);
					}
					else{
						console.log('wrong password');
						done(null,false,req.flash('message','wrong password'));
					}
				});
			}
		});
	})
);
//--> login
exports.passport=passport;