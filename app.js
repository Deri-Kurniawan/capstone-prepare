require('./third-party/platformsStrategy');
const express = require('express');
const app = express();
const routes = require('./routes');
const settings = require('./settings');
const server = require('./server');

settings({
  appInstance: app,
  expressInstance: express
});

routes(app);
server(app);
