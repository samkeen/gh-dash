module.exports = function(grunt) {

  var js_files = [
    "Gruntfile.js",
    "lib/**/*.js",
    "tests/**/*-spec.js",
    "routes/**/*.js",
    "app.js", "config.dist.js"
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      options: grunt.file.readJSON(".jshintrc"),
      all: js_files,
      debug: {
        options: {
          debug: true
        },
        files: {
          src: js_files
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Default task(s).
  grunt.registerTask("default", ["build"]);

  grunt.registerTask("build", [
    "jshint:all"
  ]);

};