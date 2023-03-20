const { createApolloFetch } = require('apollo-fetch');
const env = process.env;
const url = require('url');  

var serverURL = env.SERVER_PROTOCOL + '://' + env.SERVER_HOST + ":" + env.SERVER_PORT + '/';
var apiFullPath = url.resolve(serverURL, env.API_URI);
const fetch = createApolloFetch({
    uri: apiFullPath
});

module.exports = fetch;