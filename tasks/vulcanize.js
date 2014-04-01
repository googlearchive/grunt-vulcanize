/*
 * grunt-vulcanize
 * https://github.com/Polymer/grunt-vulcanize
 *
 * Copyright (c) 2013 The Polymer Authors
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function(grunt) {

  var vulcanize = require('vulcanize');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  //TODO: fix this in vulcanize
  function excludeFixup(sink, source) {
    if (source) {
      source.forEach(function(s) {
        sink.push(new RegExp(s));
      });
    }
  }

  grunt.registerMultiTask('vulcanize', 'Inline HTML Imports', function() {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      csp: false,
      inline: false,
      strip: false,
      excludes: {
        imports: [],
        scripts: [],
        styles: []
      }
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // Handle options.
      options.input = src[0];
      options.output = f.dest;

      var e = options.excludes;

      vulcanize.setOptions(options, function(err) {
        if (err) {
          return grunt.fatal(err);
        }
        excludeFixup(options.excludes.imports, e.imports);
        excludeFixup(options.excludes.styles, e.styles);
        excludeFixup(options.excludes.scripts, e.scripts);
        vulcanize.processDocument();
        grunt.log.ok();
        grunt.verbose.writeln('wrote %s', f.dest + (!options.csp ? '' : ' and ' + f.dest.replace('.html', '.js')));
        done();
      });

    });
  });

};
