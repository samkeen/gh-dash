
exports.list = function (req, res) {
  var owner      = req.app.get("config").gh_owner;
  var auth_token = req.app.get("config").gh_auth_token;
  console.log(owner, " :: ", auth_token);

  var gh_client  = require("../lib/GhClient")(auth_token);
  var repos_uri = "/users/" + owner + "/repos";
  console.log("REPOS URI: ", repos_uri);
  gh_client.get(repos_uri, function (err, request, response, repos) {

    console.log(JSON.stringify(repos, null, 2));
    res.render(
      "repos",
      {
        title: "Repos for " + owner,
        owner: owner,
        repos: repos
      }
    );
  });

};