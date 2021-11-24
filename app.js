require('./third-party/platformsStrategy');
const express = require('express');
const app = express();
const routes = require('./routes');
const settings = require('./settings');
const server = require('./server');

settings.init({ app, express });

routes.init(app);
server.run(app);
