const passport = require('passport');
const LocalStrategy = require('passport-local');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./database/User');

passport.use(new LocalStrategy(
    function (email, password, done) {
        User.findOne(
            { email: email },
            function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
    }
))

// passport.use(new GoogleStrategy({
//     clientID: '791515111274-8vt2155cfutcmbhfmhc6tptui6efnhce.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(accessToken);
//     console.log(refreshToken);
//     User.find({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });


module.exports = passport;