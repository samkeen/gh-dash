
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Title" });
};

/*
 * GET token page.
 */

exports.access_token = function(req, res){
    res.render('access_token', {
        title: "Get an Access Token",
        layout: "layout"
    });
};