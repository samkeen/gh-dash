
/*
 * GET token page.
 */

exports.access_token = function(req, res){
  res.render('access_token', { title: "Get an Access Token" });
};