/*
 * GET token page.
 */

//function Podcast() {
//  if(false === (this instanceof Podcast)) {
//    return new Podcast();
//  }
//}
//
//Podcast.prototype.download = function(episode) {
//  console.log('Downloading: ' + episode);
//}

//module.exports = Podcast;

exports.list = function (req, res) {
  var owner      = req.app.get("config").gh_owner;
  var repo_name  = req.params.repo;
  var auth_token = req.app.get("config").gh_auth_token;
  console.log(owner, " :: ", repo_name, " :: ", auth_token);



  var gh_client  = require("../lib/GhClient")(auth_token);
//  var gh_client = new GhClient();
  var pull_requests;
  var pull_uri = "/repos/" + owner + "/" + repo_name + "/pulls";
  console.log("PULL URI: ", pull_uri);
  gh_client.get(pull_uri, function (err, request, response, pull_requests) {

    console.log(JSON.stringify(pull_requests, null, 2));
    res.render(
      // GET /repos/:owner/:repo/pulls
      "pull_request/list",
      {
        title: "Pull Requests for " + repo_name,
        repo_name: repo_name,
        pull_requests: pull_requests
      }
    );
  });

};