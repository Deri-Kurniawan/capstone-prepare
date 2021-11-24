const session = require('express-session');
const { flash } = require('express-flash-message');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const time = require('./helpers/timeHelper');

const settings = ({
   appInstance: app,
   expressInstance: express 
  }) => {

  app.set('view engine', 'ejs');
  app.set('trust proxy', 1);
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.json());

  app.use(session({
    cookie: { maxAge: time.day * 7 },
    secret: 'CADLABAH',
    name: 'cadlabah-app-session',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash({ sessionKeyName: 'cadlabahFlashMessage' }));
};

module.exports = settings;
