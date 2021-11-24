const { SERVER_PORT } = require('./globals/config');

const server ={
  run: (app) => {
    app.listen(SERVER_PORT, () => {
      console.log(`server serve on http://localhost:${SERVER_PORT}`);
    });
  }
};

module.exports = server;
