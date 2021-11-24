const { google, twitter, github } = require('./middleware/authStrategyMiddleware');
const {
  homeHandler,
  loginHandler,
  registerHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  registerProcessHandler,
  logoutHandler,
  authPlatformSuccessHandler,
} = require('./handlers');
const userMiddleware = require('./middleware/userMidldeware');

const routes = {
  init: (app) => {
    app.get('/', userMiddleware.isLoggedIn, homeHandler);
    app.get('/home', homeHandler);
    app.get('/login', loginHandler);
    app.get('/register', registerHandler);
    app.get('/posts', postsHandler);
    app.get('/posts/category', postsCategoryHandler);
    app.get('/posts/category/:type', postsCategoryTypeHandler);
    app.get('/auth/google', google.request);
    app.get('/auth/github', github.request);
    app.get('/google/callback', google.verify);
    app.get('/github/callback', github.verify);
    app.get('/logout', logoutHandler);
    app.get('/auth/success', authPlatformSuccessHandler);

    app.post('/register', registerProcessHandler);

    app.use('*', (req, res) =>{
      res.status(404).end('page not found');
    });
  }
}

module.exports = routes;
