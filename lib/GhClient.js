/**
 * Created by sam on 12/23/13.
 */
var restify = require("restify");

module.exports = function (token) {

  var client = restify.createJsonClient({
    url: "https://api.github.com"
  });

  client.basicAuth(token, "x-oauth-basic");

  return client;
};
