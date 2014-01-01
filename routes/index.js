
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render(
      'index',
      {
          title: "Title",
          layout: "layout" // optionally override layout
      }
  );
};