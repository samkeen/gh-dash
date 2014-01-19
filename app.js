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

var swig = require("swig");

// all environments
app.configure(function () {
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "views"));
  app.set("config", config);

  app.engine("html", swig.renderFile);
  app.set("view engine", "html");
  app.set("views", __dirname + "/views");
  // use Express cache instead of Swig's
  swig.setDefaults({ cache: false });
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
  // turn off view caches in dev
  app.set("view cache", false);
  app.use(express.errorHandler());
});

// Production only
app.configure("production", function () {
  app.set("view cache", true);
  app.use(express.errorHandler({dumpExceptions: true}));
});

app.get("/", routes.index);
app.get("/token", token.access_token);
app.get("/users", user.list);
app.get("/pull_request/:repo", pull_request.list);

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
