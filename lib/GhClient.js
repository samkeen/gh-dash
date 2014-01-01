/**
 * Created by sam on 12/23/13.
 */
var restify = require('restify');

function GhClient() {

    var client = restify.createJsonClient({
        url: 'https://api.github.com'
    });

    return client;
}


module.exports = GhClient;

