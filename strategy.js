var passport=require('passport');
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
exports.passport=passport;