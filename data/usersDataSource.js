const API_ENDPOINT = require('../globals/api-endpoint');
const axios = require('axios').default;

const getUsers = (cb) => {
  axios.get(API_ENDPOINT.getUsers, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    cb(res.data);
  });
}

module.exports = {
  getUsers,
}