/**
 * Module dependencies.
 */

var express = require("express");
var routes = require("./routes");
var token = require("./routes/token");
var user = require("./routes/user");
var pull_request = require("./routes/pull_request");
var http = require("http");
var path = require("path");

var config = require("./config");

var app = express();

// all environments
app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.set("config", config);
  /**
   * Using hogan-express to enable partials functionality
   * @see https://github.com/vol4ok/hogan-express#usage
   */
  app.set("view engine", "html");   // # use .html extension for templates
  app.set("layout", "layout");      // # use layout.html as the default layout
  app.set("partials", {navbar: "navbar"});  // # define partials available to all pages
  //app.enable("view cache");
  app.engine("html", require("hogan-express"));
  app.use(express.logger("dev"));// Output development-friendly colored logs
  app.use(express.favicon()); // Serve default favicon
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express["static"](path.join(__dirname, "public")));

  // App level Template values
  app.set("site_name", "Gh Client");
});

// development only
app.configure("development", function () {
  app.use(express.errorHandler());
});

// Production only
app.configure("production", function () {
  app.use(express.errorHandler({dumpExceptions: true}));
});

app.get("/", routes.index);
app.get("/token", token.access_token);
app.get("/users", user.list);
app.get("/pull_request/:repo", pull_request.list);

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
