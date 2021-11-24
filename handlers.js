const axios = require('axios').default;

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

const authSuccessHandler = async (req, res) => {
  const { platform } = req.query;
  const user = req.user || null;
  const data = {};
  
  if(user !== null) {
    data.platform = platform;

    switch (platform.toLowerCase()) {
      case 'google':
        data.accountId = Number(user.id);
        data.fullName = user.displayName;
        data.email = user.email;
        break;

       case 'github':
        data.accountId = Number(user.id);
        data.fullName = user.displayName;
        data.email = user._json.email;
        break;
    
      default:
        req.flash('authError', 'Opps someting went wrong! \n please try again later!');
        res.redirect('/login');
        break;
    }

    const { getUsers } = require('./data/usersDataSource');
    const API_ENDPOINT = require('./globals/api-endpoint');

    getUsers((res) => {
      const userExists = res.find((user) => Number(user.accountId) === Number(data.accountId));
      if(!userExists) {
        axios.post(API_ENDPOINT.postUser(), data);
      }
    });

  } else {
    res.redirect('/login');
  }
  
  res.redirect('/');
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
  authSuccessHandler,
};
