const { BASE_URL } = require('../globals/config');
const passport = require('passport');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '799094837740-gfgvlphvh6douai56d9th9kj9n2up2os.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = 'a546149080e04e7e0d48';
const GITHUB_CLIENT_SECRET = '579227d71be21da66cc4cb9046129d7a922bbd3e';

const TwitterStrategy = require('passport-twitter').Strategy;
const TWITTER_CONSUMER_KEY = 'Geo9BzK6HfNIwHe3Amy5S6tdB';
const TWITTER_CONSUMER_SECRET = 'ECVEvaJYjLzWJR9TybhfkmsteG61teCz5OF1T3iSlsMyWCqYmh';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}google/callback`,
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
  }
));

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `${BASE_URL}github/callback`,
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    return cb(null, profile);
  }
))

passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: `${BASE_URL}twitter/callback`,
},
(token, tokenSecret, profile, cb) => {
  console.log(profile);
  return cb(null, profile);
}
));

passport.serializeUser((user, done) => {done(null, user)});
passport.deserializeUser((user, done) => {done(null, user)});