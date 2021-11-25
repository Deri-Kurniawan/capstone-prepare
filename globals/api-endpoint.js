const { BASE_URL_API } = require('./config');

const API_ENDPOINT = {
  getUsers: `${BASE_URL_API}users`,
  getUser: (id) => `${BASE_URL_API}users/${id}`,
  postUser: () => `${BASE_URL_API}users`,
  putUser: (id) => `${BASE_URL_API}users/${id}`,
  deleteUser: (id) => `${BASE_URL_API}users/${id}`,
  getPosts: `${BASE_URL_API}posts`,
};

module.exports = API_ENDPOINT;
