var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./schema.js').user;
var bcrypt=require('bcrypt');

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
passport.use('signup',new LocalStrategy({ passReqToCallback : true},
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
					var NewUser = new User(); 
					NewUser.username=username;
					//----> hash password start 
					bcrypt.genSalt(10,function(erro,salt){
						if(erro){
							console.log('hash erro');
							return done(erro);
						}
						else{
							bcrypt.hash(password,salt,function(erro,hash){
								if(erro){
									console.log('hash erro');
									return done(erro);
								}
								else{
									NewUser.password=hash;
								}
							});
						}
					});
					//----> hash password end
					NewUser.email=req.params.email;
					bcrypt.hash(email, 8, function(err, hash) {
						NewUser.link=hash;
					});
					//---->newuser save start
					NewUser.save(function(err){
						if(err){
							conosole.log('save erro');
							return done(err);
						}
						else{
							return done(null,NewUser);
						}
					});
					//--->new user save end
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
						done(null,user);
					}
					else{
						done(null,false,req.flash('message','wrong password'));
					}
				});
			}
		});
	})
);
//--> login
exports.passport=passport;