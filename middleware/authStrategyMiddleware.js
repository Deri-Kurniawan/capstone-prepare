const passport = require('passport');

const authStrategyMiddleware = {
  google: {
    request: passport.authenticate('google', {scope: ['email', 'profile']}),
    verify: passport.authenticate('google', {
      successRedirect: '/auth/success?platform=google',
      failureRedirect: '/login'
    }),
  },
  github: {
    request: passport.authenticate('github', {scope: ['email', 'profile']}),
    verify: passport.authenticate('github', {
      successRedirect: '/auth/success?platform=github',
      failureRedirect: '/login'
    }),
  },
};

module.exports = authStrategyMiddleware;
