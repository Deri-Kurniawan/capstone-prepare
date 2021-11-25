const API_ENDPOINT = require('../globals/api-endpoint');
const axios = require('axios').default;

const getPosts = (cb) => {
  axios.get(API_ENDPOINT.getPosts, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    cb(res.data);
  });
  
}

module.exports = {
  getPosts,
}