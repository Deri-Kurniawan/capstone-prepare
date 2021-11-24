const fs = require('fs');
const session = require('express-session');
const { flash } = require('express-flash-message');
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

app.set('trust proxy', 1);
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  secret: 'CADLABAH',
  name: 'cadlabah-app-session',
  resave: true,
  saveUninitialized: true,
}));
 
app.use(passport.initialize());
app.use(passport.session());

app.use(flash({sessionKeyName: 'flashMessage'}));

app.get('/', isLoggedIn, (req, res) => {
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

app.get('/posts', (req, res) => {
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
    res.end();
});

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));
app.get('/auth/github', passport.authenticate('github', {scope: ['email', 'profile']}));
app.get('/auth/twitter', passport.authenticate('twitter', {scope: ['email', 'profile']}));

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/google/success',
  failureRedirect: '/login'
}));

app.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/auth/google/success', (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  // req.session.destroy();
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