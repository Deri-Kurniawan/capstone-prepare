const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = '799094837740-gfgvlphvh6douai56d9th9kj9n2up2os.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const CONFIG = require('./globals/config');

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${CONFIG.SERVER_PORT}/google/callback`,
    passReqToCallback   : true
  },
  (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {done(null, user)});
passport.deserializeUser((user, done) => {done(null, user)});