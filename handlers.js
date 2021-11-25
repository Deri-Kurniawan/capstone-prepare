const axios = require('axios').default;
const { getUsers } = require('./data/usersDataSource');
const { getPosts } = require('./data/postsDataSource');
const API_ENDPOINT = require('./globals/api-endpoint');
const { validationResult } = require('express-validator');

const homeHandler = (req, res) => {
  res.render('home', {
    title: "Beranda",
  });
}

const loginHandler = (req, res) => {
    res.render('login', {
      title: "Login",
    });
};

const postsHandler = (req, res) => {
  getPosts((posts) => {
    const undonePosts = posts.filter((post) => (post.done === false));
    res.render('posts', {
      title: "Postingan",
      posts: undonePosts,
    });
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
    setUser.createdAt = new Date().toISOString();

    switch (platform.toLowerCase()) {
      case 'google':
        setUser.email = user.email;
        break;

        case 'twitter':
         setUser.email = null;
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
  logoutHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  authPlatformSuccessHandler,
  pageNotFoundHandler,
};
