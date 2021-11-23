var session = require('express-session');
const {flash} = require('express-flash-message');
const express = require('express');
const app = express();
const path = require('path');
const CONFIG = require('./globals/config');
const passport = require('passport');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

require('./auth');

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect('/login');
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret: 'CADLABAH',
  name: 'cadlabah-app-session',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {
  res.render('home', {
    title: "Home",
  });
});

app.get('/home', (req, res) => {

  res.render('home', {
    title: "Home",
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: "Login",
  });
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: "Register",
  });
});

app.get('/posts', isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render('posts', {
    title: "Postingan",
    user: req.user,
  });
});

app.get('/posts/category', (req, res) => {
  res.render('category', {
    title: 'Daftar Kategori'
  });
});

app.get('/posts/category/:type', (req, res) => {
  res.render('posts-by-category', {
    title: "Postingan",
    category: req.params.type,
    data: []
  });
});

app.post(
  '/auth/register',
  body('full_name').isString(),
  body('email').isEmail(),
  body('password').isStrongPassword(),
  (req, res) => {
    console.log(validationResult(req));
    res.end();
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/posts',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.use('/', (req, res) =>{
  res.status(404).end('page not found');
});

// Server
app.listen(CONFIG.SERVER_PORT, () => {
  console.log(`server serve on http://localhost:${CONFIG.SERVER_PORT}`);
});