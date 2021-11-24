const CONFIG = require('./globals/config');
const passport = require('passport');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '799094837740-gfgvlphvh6douai56d9th9kj9n2up2os.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${CONFIG.SERVER_PORT}/google/callback`,
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
  }
));

const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = 'a546149080e04e7e0d48';
const GITHUB_CLIENT_SECRET = '579227d71be21da66cc4cb9046129d7a922bbd3e';

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${CONFIG.SERVER_PORT}/github/callback`,
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
  }
))

const TWITTER_CONSUMER_KEY = 'Geo9BzK6HfNIwHe3Amy5S6tdB';
const TWITTER_CONSUMER_SECRET = 'ECVEvaJYjLzWJR9TybhfkmsteG61teCz5OF1T3iSlsMyWCqYmh';
const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `http://localhost:${CONFIG.SERVER_PORT}/twitter/callback`,
},
function(token, tokenSecret, profile, cb) {
  console.log(profile);
  cb(null, profile);
}
));

passport.serializeUser((user, done) => {done(null, user)});
passport.deserializeUser((user, done) => {done(null, user)});
