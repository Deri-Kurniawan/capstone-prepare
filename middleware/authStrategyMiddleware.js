const passport = require('passport');

const authStrategyMiddleware = {
  google: {
    request: passport.authenticate('google', {scope: ['email', 'profile']}),
    verify: passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }),
  },
  twitter: {
    request: passport.authenticate('twitter', {scope: ['email', 'profile']}),
    verify: passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/login'
    }),
  },
  github: {
    request: passport.authenticate('github', {scope: ['email', 'profile']}),
    verify: passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }),
  },
};

module.exports = authStrategyMiddleware;
