const { google, twitter, github } = require('./middleware/authStrategyMiddleware');
const {
  homeHandler,
  loginHandler,
  registerHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  logoutHandler,
} = require('./handlers');
const userMiddleware = require('./middleware/userMidldeware');

const routes = (app) => {
  app.get('/', userMiddleware.isLoggedIn, homeHandler);
  app.get('/home', userMiddleware.isLoggedIn, homeHandler);
  app.get('/login', loginHandler);
  app.get('/register', registerHandler);
  app.get('/posts', postsHandler);
  app.get('/posts/category', postsCategoryHandler);
  app.get('/posts/category/:type', postsCategoryTypeHandler);
  app.get('/auth/google', google.request);
  app.get('/auth/github', github.request);
  app.get('/auth/twitter', twitter.request);
  app.get('/google/callback', google.verify);
  app.get('/github/callback', github.verify);
  app.get('/twitter/callback', twitter.verify);
  app.get('/logout', logoutHandler);

  app.use('/', (req, res) =>{
    res.status(404).end('page not found');
  });
}

module.exports = routes;
