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

module.exports = {
  homeHandler,
  loginHandler,
  registerHandler,
  postsHandler,
  postsCategoryHandler,
  postsCategoryTypeHandler,
  logoutHandler,
};
