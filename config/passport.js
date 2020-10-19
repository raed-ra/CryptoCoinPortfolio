const passport = require("passport");
const _ = require("lodash");
const User = require('../models/User');
const { Strategy: LocalStrategy } = require("passport-local");
let FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user, done) => {
  // console.log('serialize user');
  // console.log({user});
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // console.log("deserialize user");

    User.findById(id, (err, user) => {
        // console.log('deserialise');
        // console.log({user});
        done(err, user);
    });
});

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  console.log({email});
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
        // done(err, user, info pass back to controller)
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    if (!user.password) {
      return done(null, false, { msg: 'Please enter a password.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  });
}));

//----------------------------------------------------
// passport.use(new FacebookStrategy({
//     clientID: process.env.clientID,
//     clientSecret: process.env.clientSecret,
//     callbackURL: process.env.callbackURL,
//     profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
//     passReqToCallback: true,
//     //passResToCallback: true
//   },
//     function (req, accessToken, refreshToken, profile, done) {
//       User.findOne({ 'facebookId': profile.id  }).then( (email) => {
//         if (email) {
//           console.log('existing user');
//           return done(null, email);  //user authenticated by FB and found in local database
//         }
//         else {    //user authenticated but not found  in database hence proceed to signup inside local DB
//           User.save({
//             facebookId: profile.id,
//             email: profile._json.email,
//           })
//             .then(function (user) {
//               console.log('created user');
//               return done(null, user)
              
//             })
//             .catch(function (err) {
//               console.log(err)
//               return done(err, null)
  
//             });
//           //console.log('nowhere');
//           //console.log(profile);
//         }
//       }).catch(err => {
//         done(err)
//       })
//     }
//   ));




module.exports = passport