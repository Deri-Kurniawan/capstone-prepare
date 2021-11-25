const userMiddleware = require('./middleware/authLocalMidldeware');
const { google, twitter, github } = require('./middleware/authStrategyMiddleware');
const {
  homeHandler,
  loginHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  logoutHandler,
  authPlatformSuccessHandler,
  pageNotFoundHandler,
} = require('./handlers');

const routes = {
  init: (app) => {
    app.get('/', userMiddleware.isLoggedIn, homeHandler);
    app.get('/home', homeHandler);
    app.get('/login', loginHandler);
    app.get('/posts', postsHandler);
    app.get('/posts/category', postsCategoryHandler);
    app.get('/posts/category/:type', postsCategoryTypeHandler);
    app.get('/auth/google', google.request);
    app.get('/auth/twitter', twitter.request);
    app.get('/auth/github', github.request);
    app.get('/google/callback', google.verify);
    app.get('/twitter/callback', twitter.verify);
    app.get('/github/callback', github.verify);
    app.get('/logout', logoutHandler);
    app.get('/auth/success', authPlatformSuccessHandler);

    app.use('/', pageNotFoundHandler);
  }
}

module.exports = routes;
