const axios = require('axios').default;
const { getUsers } = require('./data/usersDataSource');
const API_ENDPOINT = require('./globals/api-endpoint');

const homeHandler = (req, res) => {
  
  res.render('home', {
    title: "Home",
  });
}

const loginHandler = (req, res) => {
  res.render('login', {
    title: "Login",
  });
};

const registerHandler = (req, res) => {
  res.render('register', {
    title: "Register",
  });
};

const postsHandler = (req, res) => {
  res.render('posts', {
    title: "Postingan",
    user: req.user,
  });
}

const postsCategoryHandler = (req, res) => {
  res.render('category', {
    title: 'Daftar Kategori'
  });
};

const postsCategoryTypeHandler = (req, res) => {
  res.render('posts-by-category', {
    title: "Postingan",
    category: req.params.type,
    data: []
  });
};

const logoutHandler = (req, res) => {
  req.logout();
  res.redirect('/');
}

const registerProcessHandler = (req, res) => {
  axios.post('https://619b71a827827600174455d9.mockapi.io/api/users', req.body);
  axios.get('https://619b71a827827600174455d9.mockapi.io/api/users');
  res.end();
}

const authPlatformSuccessHandler = async (req, res) => {
  const { platform } = req.query;
  const user = req.user || null;
  const setUser = {
    accountId: null,
    platform: null,
    fullName: null,
    email: null,
    createdAt: null,
  };
  
  if(user !== null) {
    setUser.accountId = Number(user.id);
    setUser.platform = platform;
    setUser.fullName = user.displayName;
    setUser.createdAt = Date.now();

    switch (platform.toLowerCase()) {
      case 'google':
        setUser.email = user.email;
        break;

       case 'github':
        setUser.email = user._json.email;
        break;
    
      default:
        req.flash('authError', 'Opps someting went wrong! \n please try again later!');
        res.redirect('/login');
        break;
    }

    getUsers((res) => {
      const userExists = res.find((user) => (Number(user.accountId) === Number(setUser.accountId) && user.platform.toLowerCase() === setUser.platform.toLowerCase()));

      if(!userExists) {
        axios.post(API_ENDPOINT.postUser(), setUser);
      }
    });

  } else {
    res.redirect('/login');
  }
  
  res.redirect('/');
}

const pageNotFoundHandler = (req, res) =>{
  res.status(404).end('page not found');
}

module.exports = {
  homeHandler,
  loginHandler,
  registerHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  logoutHandler,
  registerProcessHandler,
  authPlatformSuccessHandler,
  pageNotFoundHandler,
};
