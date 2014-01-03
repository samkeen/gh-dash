/*
 * GET users listing.
 */

exports.list = function (req, res) {
  var GhClient = require("../lib/GhClient");
  var gh_client = new GhClient();
  gh_client.get("/users/samkeen/repos", function (err, req, res, obj) {

    console.log(JSON.stringify(obj, null, 2));
  });
  res.send("respond with a resource");
};